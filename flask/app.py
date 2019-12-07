#!usr/bin/env python3.8
"""Flask App for Scholarscrape."""

import json
from os import environ
from symbol import parameters
from urllib import response

from flask import Flask, abort, jsonify
from flask_restful import Api, Resource, reqparse
from flask_restful.reqparse import RequestParser

from app_helper import MyJSONEncoder, date_today_s, db_connect, init_admin_user
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
app.config['BUNDLE_ERRORS'] = True
app.config['JWT_SECRET_KEY'] = environ['JWT_SECRET_KEY']
api = Api(app)
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

app.json_encoder = MyJSONEncoder


@app.before_first_request
def startup():
    """Flask Startup Script.

    Runs before first request.

    """
    init_admin_user(bcrypt)


class Scholarships(Resource):
    """Class for /scholarships route.

    Args:
        Resource (obj): Resource from the request

    """

    def get(self):
        """Get from scholarships.

        Returns:
            json: Data for all scholarships

        """
        db, cursor = db_connect()
        cursor.execute('''  SELECT * FROM Scholarship
                            INNER JOIN Reqtag R ON Scholarship.idreqtag = R.idreqtag
                            ''')
        row_headers = [x[0] for x in cursor.description]
        rv = cursor.fetchall()
        json_data = []

        for result in rv:
            json_data.append(dict(zip(row_headers, result)))

        response = jsonify(json_data)

        # Close DB
        db.commit()
        cursor.close()
        db.close()

        return response

    def post(self):
        """Post to scholarships.

        Arguments:
            keywords: Keywords separated by commas.
            major (required): academic major as listed in database (example: actuarial-science)

        Returns:
            json: Data for filtered scholarships

        """
        try:
            # Parse request parameters
            parser = reqparse.RequestParser(bundle_errors=True)
            parser.add_argument('major', required=True, help="{error_msg} - Academic major. Must be direct match to the data in the database.")
            parser.add_argument('keywords', help="{error_msg} - Keywords separated by commas.")
            parser.add_argument('min_amount', type=int, help="{error_msg} - Minimum limit on scholarship amount.")
            parser.add_argument('max_amount', type=int, help="{error_msg} - Maximum limit on scholarship amount.")
            parser.add_argument('sex', help="{error_msg} - Male or Female. Other will just return all.", choices=('Male', 'Female', 'Other'))
            parser.add_argument('citizenship', help="{error_msg}: True -> citizenship required. False -> citizenship not required or unknown", choices=('True', 'False'))
            parser.add_argument('essay', help="{error_msg} - True -> essay required. False -> Essay not required or unknown", choices=('True', 'False'))
            parser.add_argument('gpa', type=float, help="{error_msg} - Returns if required GPA in table > this value or if NULL.")
            args = parser.parse_args()

            # Build query parts
            query = '''SELECT * FROM Scholarship INNER JOIN Reqtag R ON Scholarship.idreqtag = R.idreqtag'''
            filters = []
            parameters = []

            if args['major']:
                filters.append(''' WHERE (major = %s OR major IS NULL) ''')
                parameters.append(args['major'])

            # Add keyword search to query
            if args['keywords']:
                for word in args['keywords'].split(','):
                    filters.append(''' AND (CONCAT(description, name)) LIKE CONCAT("%%", %s, "%%") ''')
                    parameters.append(word)

            # Add min amount to query
            if args['min_amount']:
                filters.append(''' AND amount >= %s  ''')
                parameters.append(args['min_amount'])

            # Add max amount to query
            if args['max_amount']:
                filters.append(''' AND amount <= %s ''')
                parameters.append(args['max_amount'])

            # Add sex to query
            if args['sex']:
                param = 0
                if args['sex'] == "Female":
                    param = 1
                elif args['sex'] == "Male":
                    param = 2

                if param:
                    parameters.append(param)
                    filters.append(''' AND sex = %s ''')

            # Add citizenship to query
            if args['citizenship']:
                if args['citizenship'] == 'True':
                    filters.append(''' AND citizenship =  1''')
                elif args['citizenship'] == 'False':
                    filters.append(''' AND (citizenship IS NULL OR citizenship = 0)''')

            # Add essay to query
            if args['essay']:
                if args['essay'] == 'True':
                    filters.append(''' AND essay = 1 ''')
                elif args['essay'] == 'False':
                    filters.append(''' AND (essay IS NULL OR essay = 0) ''')

            if args['gpa']:
                filters.append(''' AND (gpa <= %s OR gpa IS NULL) ''')
                parameters.append(args['gpa'])

            # Only get data where the due date has not passed
            date_today = date_today_s()
            filters.append(''' AND (deadline >= %s) ''')
            parameters.append(date_today)

            # Don't show non approved or over reported scholarships
            filters.append(''' AND accp_status >= 0 AND accp_status < 5 ''')

            # Combine query
            for filt in filters:
                query += filt

            parameters = tuple(i for i in parameters)

            # Run query
            db, cursor = db_connect()
            print(query % parameters, flush=True)
            cursor.execute(query, parameters)
            row_headers = [x[0] for x in cursor.description]
            rv = cursor.fetchall()
            json_data = []

            for result in rv:
                json_data.append(dict(zip(row_headers, result)))

            # Close DB
            db.commit()
            cursor.close()
            db.close()
        except Exception as e:
            abort(400, "{0}".format(str(e)))

        return jsonify(json_data)


class Scholarship(Resource):
    """Individual Scholarship Class.

    Args:
        Resource: /scholarship route

    post: creates a new scholarship.
    put: report a scholarship
    delete: delete a scholarship

    """

    def post(self):
        """Post to scholarship.

        Arguments:
            description
            name
            amount
            deadline
            url
            sex
            major
            citizenship
            essay
            gpa
            ethnicity

        Returns:
            json: new scholarship added to database

        """
        # Parse request parameters
        parser = reqparse.RequestParser()
        parser.add_argument('desc', required=True, help="{error_msg} - description")
        parser.add_argument('name', required=True, help="{error_msg} - major")
        parser.add_argument('amount', type=int, required=True, help="{error_msg} - amount")
        parser.add_argument('deadline', help="{error_msg} - deadline")
        parser.add_argument('url', required=True, help="{error_msg} - Application URL")
        parser.add_argument('sex', type=int, help="{error_msg} - 1 Female 2 Male")
        parser.add_argument('major', help="{error_msg} - major")
        parser.add_argument('citizenship', help="{error_msg} - citizenship")
        parser.add_argument('essay', help="{error_msg} - essay")
        parser.add_argument('GPA', type=float, help="{error_msg} - gpa")
        parser.add_argument('ethnicity', help="{error_msg} - ethnicity")
        args = parser.parse_args()
        desc = args['desc']
        name = args['name']
        amount = args['amount']
        deadline = args['deadline']
        url = args['url']
        accp_status = -1
        sex = args['sex']
        major = args['major']
        citizenship = args['citizenship']
        essay = args['essay']
        GPA = args['GPA']
        ethnicity = args['ethnicity']
        try:
            db, cursor = db_connect()

            scholarshipQuery = """
                            INSERT INTO Scholarship(description, name, amount, deadline, url, accp_status) VALUES(%s, %s, %s, %s, %s, %s)
                            """
            scholarshipData = (desc, name, amount, deadline, url, accp_status)
            cursor.execute(scholarshipQuery, scholarshipData)

            cursor.execute("SELECT idScholarship FROM Scholarship where idScholarship = (SELECT LAST_INSERT_ID())")
            lastScholarshipID = cursor.fetchone()
            LSID = lastScholarshipID[0]

            tagQuery = """
                    INSERT INTO Reqtag(sex, major, citizenship, essay, GPA, ethnicity, idScholarship) VALUES(%s, %s, %s, %s, %s, %s, %s)
                    """
            tagData = (sex, major, citizenship, essay, GPA, ethnicity, LSID)
            cursor.execute(tagQuery, tagData)

            # Geting the last inserted tag's ID.
            cursor.execute("SELECT idreqtag FROM Reqtag where idreqtag = (SELECT LAST_INSERT_ID())")
            lastReqtagID = cursor.fetchone()

            # Linking the two relations together
            cursor.execute("UPDATE Scholarship set idreqtag = %s where idScholarship = %s", (lastReqtagID[0], lastScholarshipID[0]))

            db.commit()
            cursor.close()
            db.close()

        except Exception as e:
            abort(400, "{0}".format(str(e)))
        return {'success': 'Write success!'}

    def put(self):
        """Report Scholarship."""
        parser = reqparse.RequestParser()
        parser.add_argument('idScholarship', type=int, required=True, help="{error_msg} - Scholarship ID")
        args = parser.parse_args()

        try:
            db, cursor = db_connect()

            # Check if ID exists
            query = """ UPDATE Scholarship SET accp_status = accp_status + 1 WHERE idScholarship = %s """
            print(args["idScholarship"], flush=True)
            cursor.execute(query, (args["idScholarship"],))


            if cursor.rowcount == 0:
                abort(400, message="ID does not exist.")

            db.commit()
            cursor.close()
            db.close()

            return {'message': 'Successfully reported scholarship.'}
        except Exception as e:
            abort(400, "{0}".format(str(e)))

    def delete(self):
        #parsing the Scholarship ID argument and assigning idNum to it
        parser = reqparse.RequestParser()
        parser.add_argument('id', required=True, help="{error_msg} - id")
        args = parser.parse_args()
        idNum = args['id']

        db, cursor = db_connect()

        # Deleting row from Scholarship and Reqtag dbs that contain the scholarship ID
        cursor.execute("DELETE FROM Scholarship where idScholarship = %s", (idNum,))
        cursor.execute("DELETE FROM Reqtag where idScholarship = %s", (idNum,))

        db.commit()
        cursor.close()
        db.close()

        return {'success': 'Delete success!'}

class UserLogin(Resource):
    """Class for /user/login route."""

    def post(self):
        """Login User."""
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True, help="{error_msg}: Admin Username")
        parser.add_argument('password', type=str, required=True, help="{error_msg}: Password")
        args = parser.parse_args()

        db, cursor = db_connect()

        query = """
            SELECT * FROM Account WHERE username=%s
        """
        cursor.execute(query, (args['username'],))
        userData = cursor.fetchone()
        password = userData[2]

        cursor.close()
        db.close()

        if bcrypt.check_password_hash(password, args['password']):
            access_token = create_access_token(identity=args['username'])
            response = jsonify({"token": access_token})
            response.status_code = 200
            return response
        else:
            response = jsonify({"error": "Invalid username and password"})
            response.status_code = 200
            return response

class AdminTable(Resource):
    def get(self):
        """Get scholarships for admin approval table."""
        try:
            query = '''
                SELECT Scholarship.idScholarship, accp_status, name, url, amount, description, deadline
                FROM Scholarship
                INNER JOIN Reqtag R ON Scholarship.idreqtag = R.idreqtag
                WHERE (accp_status < 0 OR accp_status > 0)
            '''

            db, cursor = db_connect()
            print(query, flush=True)
            cursor.execute(query)

            row_headers = [x[0] for x in cursor.description]
            rv = cursor.fetchall()
            json_data = []

            for result in rv:
                json_data.append(dict(zip(row_headers, result)))


            cursor.close()
            db.close()
        except Exception as e:
            abort(400, "{0}".format(str(e)))
        return jsonify(json_data)

    def put(self):
        """Approve scholarships."""
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('idList', type=int, required=True, help="{error_msg} - List of IDs to approve", action="append")
        args = parser.parse_args()

        query = '''
            UPDATE Scholarship SET accp_status = 0 WHERE idScholarship IN
        '''

        try:
            for i in range(len(args['idList'])):
                if i == 0:
                    query += '''(%s'''
                else:
                    query += ''', %s'''
            query += ''')'''

            qargs = tuple(args['idList'],)
            print(query % qargs, flush=True)
            db, cursor = db_connect()

            cursor.execute(query, qargs)


            db.commit()
            cursor.close()
            db.close()

        except Exception as e:
            abort(400, "{0}".format(str(e)))

        return {'message': 'Successfully approved.'}

    def delete(self):
        """Delete scholarships in table"""

        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('idList', type=int, required=True, help="{error_msg} - List of IDs to approve", action="append")
        args = parser.parse_args()

        query = '''
            DELETE Scholarship, R
            FROM Scholarship
            INNER JOIN Reqtag R ON Scholarship.idreqtag = R.idreqtag
            WHERE Scholarship.idScholarship IN
        '''
        try:
            for i in range(len(args['idList'])):
                if i == 0:
                    query += '''(%s'''
                else:
                    query += ''', %s'''
            query += ''')'''

            qargs = tuple(args['idList'])
            print(query % qargs, flush=True)
            db, cursor = db_connect()

            cursor.execute(query, qargs)


            db.commit()
            cursor.close()
            db.close()

        except Exception as e:
            abort(400, "{0}".format(str(e)))

        return {'message': 'Successfully Deleted.'}




api.add_resource(Scholarships, '/scholarships')
api.add_resource(Scholarship, '/scholarship')
api.add_resource(UserLogin, '/users/login')
api.add_resource(AdminTable, '/admin-table')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
