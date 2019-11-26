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
    
    def post(self):#placeholder arguments used for now --description, name, amount, deadline, url, sex, major, citizenship, essay, gpa, ethnicity
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
        #description = description
        #name = name
        #amount = amount
        #deadline = deadline
        #url = url
        #sex = sex
        #major = major
        #citizenship = citizenship
        #essay = eassy
        #gpa = gpa
        #ethnicity = ethnicity
        
        db, cursor = db_connect()
        json_data = []
        return json.dumps(json_data, default=json_converter)

    def delete(id):
        id = id
        db, cursor =db_connect()
        json_data = []
        return json.dumps(json_data, default=json_converter)

api.add_resource(Scholarship, '/scholarship')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
