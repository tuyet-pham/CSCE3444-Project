insertQuery="""
    INSERT INTO Scholarship (name, url, amount, deadline, accp_status ) VALUES (%s,%s,%s,%s,%s)
    """

feature="""
AND %s = %s;
"""

select="""
    SELECT * FROM Scholarship WHERE %s = %s;
    """

