#!usr/bin/env python3.8
import json

from flask import Flask
from flask_restful import Api, Resource, reqparse

from app_helper import db_connect, json_converter

app = Flask(__name__)
api = Api(app)

class Scholarships(Resource):
    def get(self):
        db, cursor = db_connect()
        cursor.execute('''  SELECT * FROM Scholarship
                            INNER JOIN Reqtag R ON Scholarship.idreqtag = R.idreqtag
                            ''')
        row_headers=[x[0] for x in cursor.description]
        rv = cursor.fetchall()
        json_data=[]

        for result in rv:
            json_data.append(dict(zip(row_headers,result)))

        return json.dumps(json_data, default=json_converter)

    def post(self):
        # Parse request parameters
        parser = reqparse.RequestParser()
        parser.add_argument('keywords', help="keywords separated by commas")
        args = parser.parse_args()

        # Build query
        query=  ''' SELECT * FROM Scholarship
                    INNER JOIN Reqtag R ON Scholarship.idreqtag = R.idreqtag
                '''
        if args['keywords']:
            for word in args['keywords'].split(','):
                query += ''' WHERE description LIKE "%''' + word + '''%"'''
                print(query, flush=True)

        # Run query
        db, cursor = db_connect()
        cursor.execute(query)
        row_headers=[x[0] for x in cursor.description]
        rv = cursor.fetchall()
        json_data=[]

        for result in rv:
            json_data.append(dict(zip(row_headers,result)))

        return json.dumps(json_data, default=json_converter)


api.add_resource(Scholarships, '/scholarships')

class Scholarship(Resource):
    def post(name, url, amount, deadline, description): #placeholder arguments used for now
        #just filler for the post and delete functions at the moment. Will add more 
        db, cursor = db_connect()
        return json.dumps(json_data, default=json_converter)

    def delete(self):
        db, cursor =db_connect()
        return json.dumps(json_data, default=json_converter)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
