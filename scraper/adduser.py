import mysql.connector as sql
import sys, os
from mysql.connector import errorcode
import hashlib 

"""
    This file adds AdminUser to our Database to be able to login.
    This function was required for future Admin usage but also to test the 
    login implementation of the web-app.
"""

# CREATE TABLE IF NOT EXISTS `scholarscrape`.`Admin`
# (
#     `idAdmin`       INT NOT NULL auto_increment,
#     `privilege_lvl` INT NOT NULL DEFAULT 0,
#     `idaccount`     INT NULL REFERENCES Account (idaccount),
#     PRIMARY KEY (`idAdmin`)
# );

# -- -----------------------------------------------------
# -- Table `ScholarScrape`.`account`
# -- -----------------------------------------------------
# CREATE TABLE IF NOT EXISTS `scholarscrape`.`Account`
# (
#     `idaccount` INT          NOT NULL auto_increment,
#     `username`  VARCHAR(20)  NOT NULL,
#     `hashpass`  VARCHAR(100) NOT NULL,
#     `idAdmin`   INT          NOT NULL REFERENCES Admin (idAdmin),
#     PRIMARY KEY (`idaccount`, `idAdmin`)
# );

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
                    INSERT INTO Admin (privilege_lvl, (%s)
                    """
            userData = (row[0])
            cursor.execute(userQuery, userData)

            cursor.execute("SELECT idAdmin FROM Admin where idAdmin = (SELECT LAST_INSERT_ID())")
            lastAdminID = cursor.fetchone()

            accountQuery ="""
                    INSERT INTO Account (username, password, idAdmin) VALUES (%s, %s, %s)
                    """
            data = (row[1], hasher(row[2]), lastAdminID)
            cursor.execute(tagQuery, data)

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