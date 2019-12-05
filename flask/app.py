#!usr/bin/env python3.8
"""Flask App for Scholarscrape."""

import json
from symbol import parameters

from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS

from app_helper import MyJSONEncoder, date_today_s, db_connect

app = Flask(__name__)
app.config['BUNDLE_ERRORS'] = True
api = Api(app)
CORS(app)
app.json_encoder = MyJSONEncoder


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
            abort(400, message="{0}".format(str(e)))

        return jsonify(json_data)


class Scholarship(Resource):
    """Individual Scholarship Class.

    Args:
        Resource: /scholarship route

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
            abort(400, message="{0}".format(str(e)))
        return {'success': 'Write success!'}

    # def delete(id):
    #     id = id
    #     db, cursor =db_connect()
    #     json_data = []
    #     return json.dumps(json_data, default=json_converter)




api.add_resource(Scholarships, '/scholarships')
api.add_resource(Scholarship, '/scholarship')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
