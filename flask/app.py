#!usr/bin/env python3.8
import json
from symbol import parameters

from flask import Flask
from flask_restful import Api, Resource, reqparse

from app_helper import db_connect, json_converter

app = Flask(__name__)
api = Api(app)


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
        row_headers=[x[0] for x in cursor.description]
        rv = cursor.fetchall()
        json_data=[]

        for result in rv:
            json_data.append(dict(zip(row_headers, result)))

        return json.dumps(json_data, default=json_converter)

    def post(self):
        """Post to scholarships.
        Arguments:
            keywords: Keywords separated by commas.
            major (required): academic major as listed in database (example: actuarial-science)
        Returns:
            json: Data for filtered scholarships
        """
        # Parse request parameters
        parser = reqparse.RequestParser()
        parser.add_argument('keywords', help="Keywords separated by commas.")
        parser.add_argument('major', required=True, help="Academic major")
        args = parser.parse_args()

        # Build query parts
        query = '''SELECT * FROM Scholarship INNER JOIN Reqtag R ON Scholarship.idreqtag = R.idreqtag'''
        filters = []
        parameters = []

        if args['major']:
            filters.append(''' WHERE major=%s ''')
            parameters.append(args['major'])

        if args['keywords']:
            for i, word in enumerate(args['keywords'].split(',')):
                filters.append(''' AND (CONCAT(description, name)) LIKE CONCAT("%%", %s, "%%") ''')
                parameters.append(word)

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
            json_data.append(dict(zip(row_headers,result)))

        return json.dumps(json_data, default=json_converter)


api.add_resource(Scholarships, '/scholarships')

class Scholarship(Resource):
    
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
            json: new scholarship to be added to database
        """

        # Parse request parameters
        parser = reqparse.RequestParser()
        parser.add_argument('desc', help="description")
        parser.add_argument('name', help="major")
        parser.add_argument('amount', help="amount")
        parser.add_argument('deadline', help="deadline")
        parser.add_argument('url', help="url")
        parser.add_argument('sex', help="sex")
        parser.add_argument('major', help="major")
        parser.add_argument('citizenship', help="citizenship")
        parser.add_argument('GPA', help="gpa")
        parser.add_argument('ethnicity', help="ethnicity")
        args = parser.parse_args()
        desc = args['desc']
        name = args['name']
        amount = args['amount']
        deadline = args['deadline']
        url = args['url']
        accp_status = 1
        sex = args['sex']
        major = args['major']
        citizenship = args['citizenship']
        GPA = args['GPA']
        ethnicity = args['ethnicity']

        db, cursor = db_connect()
        
        scholarshipQuery = """
                        INSERT INTO Scholarship(desc, name, amount, deadline, url, accp_status) VALUES(%s, %s, %s, %s, %s, %s)
                        """
        scholarshipData = []
        scholarshipData.append(desc)
        scholarshipData.append(name)
        scholarshipData.append(amount)
        scholarshipData.append(deadline)
        scholarshipData.append(url)
        scholarshipData.append(accp_status)
        #cursor.execute(scholarshipQuery, scholarshipData) #<---- Broken line
        
        cursor.execute("SELECT idScholarship FROM Scholarship where idScholarship = (SELECT LAST_INSERT_ID())")
        lastScholarshipID = cursor.fetchone()



        # Geting the last inserted tag's ID.
        cursor.execute("SELECT idreqtag FROM Reqtag where idreqtag = (SELECT LAST_INSERT_ID())")
        lastReqtagID = cursor.fetchone()

        # Linking the two relations together
        cursor.execute("UPDATE Scholarship set idreqtag = %s where idScholarship = %s", (lastReqtagID[0], lastScholarshipID[0]))


        # queries to NULL where deadline = '1000-01-01' and where amount = 0
        cursor.execute("UPDATE Scholarship set deadline = NULL where deadline = '1000-01-01'")
        cursor.execute("UPDATE Scholarship set amount = NULL where amount = 0")

        # queries to NULL where GPA = '-1' and where ethnicity = '-1' and where sex = '-1'
        cursor.execute("UPDATE Reqtag set GPA = NULL where GPA = '-1'")
        cursor.execute("UPDATE Reqtag set ethnicity = NULL where ethnicity = '-1'")
        cursor.execute("UPDATE Reqtag set sex = NULL where sex = '-1'")

    def delete(id):
        id = id
        db, cursor =db_connect()
        json_data = []
        return json.dumps(json_data, default=json_converter)

api.add_resource(Scholarship, '/scholarship')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
