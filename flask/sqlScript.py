insertQuery="""
    INSERT INTO Scholarship (name, url, amount, deadline, accp_status ) VALUES (%s,%s,%s,%s,%s)
    """


select="""
    SELECT * FROM Scholarship WHERE %s = %s;
    """

feature="""
AND %s = %s;
"""

tagQuery = """
    INSERT INTO Reqtag (sex, major, citizenship, essay, GPA, ethnicity, idScholarship) 
    VALUES (%s, %s, %s, %s, %s, %s %s)"""