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
import datetime

def scrape(usern, passwd, hostl, databasen):
    try:
        self.conx = sql.connect(user=usern, password=passwd , host=hostl, database=databasen)
        self.cursor = conx.cursor()

        time=date.today()
        filename='scan_'+str(time)+'.csv'
        reader = csv.reader(open(filename))


        # for each row in the csv file the cursor will make a relation in the table `Scholarship` with name, URL, amount and deadline.
        for row in reader:
            self.cursor.execute("INSERT INTO Scholarship (name, url, amount, deadline ) VALUES (%s,%s,%s,%s)", row)


        print("Successful Scrape! Scraped filename : %s" %filename)
        # Close 
        conx.commit()
        cursor.close()
        conx.close()
    except sql.Error as er:
        if er.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with username or password")
        elif er.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exit")
        else:
            print(er)



def toDate(date_str):
    if date_str=='Varies' or date_str=='varies':
        # newdate = '00/00/0000'
        # format_str = '%d/%m/%Y' # The format
        # datetime_obj = datetime.datetime.strptime(newdate, format_str)
        return None
    else:
        format_str = '%m/%d/%Y' # The format
        datetime_obj = datetime.datetime.strptime(date_str, format_str)
        return datetime_obj.date() 

def toAmount(amount):
     if amount=='Varies' or amount=='varies':
        return None
    else:
        intAmount = int(amount)
        return intAmount
