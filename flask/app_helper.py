#!usr/bin/env python3

"""Helper functions for flask app."""

from datetime import date, datetime
from os import environ
from os.path import abspath

import mysql.connector as sql


def json_converter(o):
    """Convert datetime and date objects to string for JSON serialization.

    Args:
        o (object): Object to check

    Raises:
        TypeError: Object can't be serialized

    Returns:
        str: Properly formatted date

    """
    if isinstance(o, (datetime, date)):
        return o.isoformat()
    raise TypeError("Type %s not serializable" % type(o))


def db_connect():
    """Connect to database.

    Returns:
        db: Database object
        cursor: Cursor object

    """
    try:
        db = sql.connect(user=environ['MYSQL_USER'], password=environ['MYSQL_PASSWORD'], host="db", database=environ['MYSQL_DB_NAME'])
        cursor = db.cursor()

        return db, cursor
    except sql.Error as er:
        if er.errno == sql.errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with username or password")
        elif er.errno == sql.errorcode.ER_BAD_DB_ERROR:
            print("Database does not exit")
        else:
            print(er)

def date_today_s():
    """Get current date in SQL search format.

    Returns:
        str: Current Date

    """
    return date.today().strftime('%Y-%m-%d')
