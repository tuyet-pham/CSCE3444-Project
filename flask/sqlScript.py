
# To add into the database
# on table Scholarship & table Reqtag
# Usage : When people request listing

insertQuery = """
        INSERT INTO Scholarship ( name, url, amount, deadline, accp_status ) 
        VALUES (%s,%s,%s,%s,%s)
        """

tagQuery = """
        INSERT INTO Reqtag (sex, major, citizenship, essay, GPA, ethnicity, idScholarship) 
        VALUES (%s, %s, %s, %s, %s, %s %s)
        """


# To add into the database
# on table Scholarship & table Reqtag
# Usage : Selecting Scholarships joined with Reqtag
#       
# Example:   
#       'SELECT name, url, amount, deadline, major 
#       FROM Scholarship
#       INNER JOIN Reqtag R ON Scholarship.idreqtag = R.idreqtag 
#       WHERE major LIKE '%computer%' AND amount > 2000;
#       
select = """
        SELECT %s FROM Scholarship
        INNER JOIN Reqtag R ON Scholarship.idreqtag = R.idreqtag
        """


# Add-ons to Select statements
# [LIKE, =, >, <, etc] 
# Usage : 
#       'WHERE amount > 3000'
#       'WHERE major LIKE '%computer% AND amount > 10000;

conditions = """
        WHERE %s %s '%s' 
        """

addConditions = """
        AND %s %s %s;
        """
