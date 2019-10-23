#!usr/bin/env python
# mysql.connector & it's corresponding error code for to be able to connect to the mysql database
#
# The following code is to 'insert into' the scraped scholarships ONLY. 
# This script is not used for the scholarships that are pending for removal or acceptance.
#
# The following packages :
#   $ pip install MySQL-python
#   $ pip install mysql-connector-python

import mysql.connector as sql
import sys, os
from mysql.connector import errorcode
import csv 
from datetime import date



try:
    # Try the connection : user=root pass=password1 host='localhsot' or host='127.0.0.1' database='scholarscrape'
    # Make a named cursor. This will allow us to execute the commands. Acts as the ( > ) like in terminal.
    conx = sql.connect(user=sys.argv[1], password=sys.argv[2], host='127.0.0.1', database='scholarscrape')
    cursor = conx.cursor()

    # This is to look for the .csv file that was scanned the same day this script willrun and store the data.
    time=date.today()

    filename='scan_'+str(time)+'.csv'
    reader = csv.reader(open(filename))

    # for each row in the csv file the cursor will make a relation in the table `Scholarship` with name, URL, amount and deadline.
    for row in reader:
        cursor.execute("INSERT INTO Scholarship (name, url, amount, deadline, ) VALUES (%s,%s,%s,%s)", row)
        

    # Close when done. 
    conx.commit()
    cursor.close()
    conx.close()
    print("done") 

except sql.Error as er:
    if er.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with username or password")
    elif er.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exit")
    else:
        print(er)


       