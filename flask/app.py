#!usr/bin/env python3.8
from flask import Flask
from flask_restful import Resource, Api
import json

from app_helper import db_connect

app = Flask(__name__)
api = Api(app)

class Scholarships(Resource):
    def get(self):
        db, cursor = db_connect()
        cursor.execute('''SELECT * FROM Scholarship''')
        row_headers=[x[0] for x in cursor.description]
        rv = cursor.fetchall()
        json_data=[]

        for result in rv:
            json_data.append(dict(zip(row_headers,result)))

        print(json_data)

        return json_data

api.add_resource(Scholarships, '/scholarships')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
