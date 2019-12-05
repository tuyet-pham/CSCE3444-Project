import mysql.connector as sql
import sys
from mysql.connector import errorcode
import hashlib
from os import environ


"""
    This file adds AdminUser to our Database to be able to login.
"""

# adduser
# @param username of an existing Admin, password, host IP or name
# feature : This function makes a Admin User Account, **FILENAME OF USERS TO BE ADDED**
#           In order for this to work, an existing Admin User needs to 
#           be authenticated.
def adduser(usern, passwd, hostl, databasen, FILENAME):
    try:
        conx = sql.connect(user=usern, password=passwd , host=hostl, database=databasen)
        cursor = conx.cursor()

        reader = csv.reader(open(FILENAME))

        i = 0
        for row in reader:
            if i == 0:
                i = i + 1
                continue
        else:
            userQuery="""
                    INSERT INTO Admin (privilege_lvl) VALUES (%s)
                    """
            userData = (int(row[0]))
            cursor.execute(userQuery, userData)

            cursor.execute("SELECT idAdmin FROM Admin where idAdmin = (SELECT LAST_INSERT_ID())")
            lastAdminID = cursor.fetchone()

            accountQuery ="""
                    INSERT INTO Account (username, password, idAdmin) VALUES (%s, %s, %s)
                    """
            data = (row[1], hasher(row[2]), lastAdminID)
            cursor.execute(accountQuery, data)

            # Geting the last inserted accountid
            cursor.execute("SELECT idaccount FROM Account where idaccount = (SELECT LAST_INSERT_ID())")
            lastAccountID = cursor.fetchone()

            # Linking account and admin
            cursor.execute("UPDATE Admin set idaccount = %s where idAdmin = %s", (lastAccountID[0], lastAdminID[0]))

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



def hashpass(plaintxt):
    result = hashlib.md5(plaintxt.encode())    
    return result.hexdigest()
