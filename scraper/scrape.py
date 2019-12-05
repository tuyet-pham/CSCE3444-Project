#!usr/bin/env python3
# mysql.connector & it's corresponding error code for to be able to connect to the mysql database
#
# This script is not used for the scholarships that are pending for removal or acceptance.
#
# This file also has functions : Please scroll for more into
#   (1). def toAmount(str)
#   (2). def toDate(str)
#   (3). def tagBuilder(str, str, str)
#
# The following packages:
#   $ pip3 install mysql-connector-python

import mysql.connector as sql
import sys, os
from mysql.connector import errorcode
import csv
from datetime import date
import datetime
from adduser import adduser

#re : regular expression
import re





# scrape
# @param username, password, host IP or name
# feature : This functions take the csv file made by scrape.py.
#          It creates and inserts rows in the scholarship table.
#          It also makes the corresponding tags rows in the Reqtag table.
#          They are linked by `Scholarship`.`idScholarship` and `Reqtag`.`idreqtag`
def scrape(usern, passwd, hostl, databasen):
    try:
        conx = sql.connect(user=usern, password=passwd , host=hostl, database=databasen)
        cursor = conx.cursor()

        time = date.today()
        filename = 'input.csv'
        reader = csv.reader(open(filename))

        i = 0
        for row in reader:
            if i == 0:
                i = i + 1
                continue
            else:
                # Creating and inserting the scholarships by row.
                # The scholarships are missing the `desc` attribute. Otherwise all attributes are satisfied
                #
                # Scholarship table's attributes : idScholarship, description, name, amount, deadline, idreqtag, url, accp_status
                #
                scholarshipQuery ="""
                                INSERT INTO Scholarship (name, url, amount, deadline, description) VALUES (%s,%s,%s,%s,%s)
                                """
                scholarshipData = (row[0], row[1], int(row[2]), row[3], row[4])
                cursor.execute(scholarshipQuery, scholarshipData)


                # Geting the last inserted scholarship's ID.
                cursor.execute("SELECT idScholarship FROM Scholarship where idScholarship = (SELECT LAST_INSERT_ID())")
                lastScholarshipID = cursor.fetchone()


                # tagBuilder(idScholarship, url, desc) : Gives us an array of all attributes of the Reqtag table per scholarship listing
                # Reqtag table's attributes : sex, major, citizenship, essay, GPA, ethnicity, idScholarship
                #
                s = tagBuilder(lastScholarshipID[0], row[1], " ")
                tagQuery ="""
                        INSERT INTO Reqtag (sex, major, citizenship, essay, GPA, ethnicity, idScholarship) VALUES (%s, %s, %s, %s, %s, %s, %s)
                        """
                tags = (s[0], s[1], s[2], s[3], s[4], s[5], s[6])
                cursor.execute(tagQuery, tags)

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




        print("Successful insertion of scraped scholarship - Scraped filename : %s" %filename)
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


# This function formats the date from '%m/%d/%Y' to '%Y-%m-%d' so we can add it to MYSQL
# @param :
#   string in the format of '%m/%d/%Y'
def toDate(date_str):

    # Return the earliest date possible - This can't be NULL or empty here, so this is why I did this.
    if date_str == 'Varies' or date_str == 'varies' or date_str == 'deadline':
        return '1000-01-01'
    else:
        format_str = '%m/%d/%Y'                                             # The old date format
        datetime_obj = datetime.datetime.strptime(date_str, format_str)     # This will give use the formatted object which is then turned into a date string.
        return datetime_obj.date()


# This function formats the amount where if equals to 'varies' then return 0. It also takes out any spaces or ','
# @param : string in the format of '%m/%d/%Y'
def toAmount(amount):
    if amount == 'Varies' or amount == 'varies':
        return 0
    else:
        line = re.sub('[Variesv!,@#$ ]', '', amount)            # subtracting characters with regex
        if line == '':
            line = 0
        return int(line)



# This function builds a string to
# @param :
#   idscholarship - The ID of the scholarship that this table is linked to
#   url - Full link of the site
#   description - !! This is will be used when we get mor information
def tagBuilder(idscholarship, url, desc):

        # The array for all the attributes in the Reqtag table. As of right now there are
        # Peusdo values
        s = ['-1','','0','0','-1','-1',idscholarship]

        # Getting the major from url link
        temp = url
        front, back = temp.split('/academic-major/')
        major, other = back.split('/')
        s[1] = major
        return s

