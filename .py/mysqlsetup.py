import mysql.connector sql
import sys, os
from mysql.connector import errorcode

try:
    conx = sql.connect(user=args[1], password=args[2], host='127.0.0.1', database='scholarscrape')
except mysql.connector.Error as er:
    if er.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with username or password")
    elif er.errno == errorcode.ER_BAD_DB_ERROR:
        print("Databas does not exit")
    else:
        print(er)



def f 


close