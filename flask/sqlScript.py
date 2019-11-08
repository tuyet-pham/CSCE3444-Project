insertQuery="""
    INSERT INTO Scholarship (name, url, amount, deadline, accp_status ) VALUES (%s,%s,%s,%s,%s)
    """

select="""
    SELECT * FROM Scholarship WHERE %s = %s;
    """

