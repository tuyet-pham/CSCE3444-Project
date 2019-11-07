import mysql.connector as sql
import sys, os
from mysql.connector import errorcode
from datetime import date

insertQuery="""
    INSERT INTO Scholarship (name, url, amount, deadline, accp_status ) VALUES (%s,%s,%s,%s,%s)
    """

class dbScholarscrape:
    def __init__(self, usern, password, host, database):
        try:
            self.conx = sql.connect(user=usern, password=password, host=host, database=database)
            self.cur = self.conx.cursor()

            print("Setup Done.") 
        except sql.Error as er:
            if er.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with username or password")
            elif er.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exit")
            else:
                print(er)
        
    def displayListing(self):
        self.cur.execute("SELECT * FROM Scholarship where amount ==")
        result = self.cur.fetchall()
        return result
    
        
    # Will be added into our db awaiting admin approval
    def requestListing(self, name, url, amount, deadline, accp_status):
        try:
            self.cur.execute(insertQuery, (name, url, int (amount), deadline, int (accp_status)))
            #self.cur.execute("""INSERT INTO Scholarship (name, url, amount, deadline, accp_status) VALUES (%s, %s, %s, %s, %s)""", (name, url, int (amount), deadline, int (accp_status)))
            self.conx.commit()
        except sql.Error as er:
            print(er)

    def displayBy(self):
        return "Hello"

