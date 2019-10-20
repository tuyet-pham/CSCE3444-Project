import mysql.connector as sql
import sys, os
from mysql.connector import errorcode
import csv 
from datetime import date

try:
    conx = sql.connect(user=sys.argv[1], password=sys.argv[2], host='127.0.0.1', database='scholarscrape')
except mysql.connector.Error as er:
    if er.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with username or password")
    elif er.errno == errorcode.ER_BAD_DB_ERROR:
        print("Databas does not exit")
    else:
        print(er)

cursor = conx.cursor()
time=date.today()
filename='scan_'+str(time)+'.csv'

with open(filename, 'r') as f:
    scandata = csv.reader(f)
    for relation in scandata:
        cursor.execute("""INSERT INTO `Scholarship`(`name`, `desc`, `amount`, `due_date`) values(%s, %s, %d, %s)""", relation)
        conx.commit()



cursor.close()
conx.close()

print("Done")