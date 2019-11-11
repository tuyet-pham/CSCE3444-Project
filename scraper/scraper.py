#!/usr/bin/python
"""This is an HTML scraper that does the following.

1. Go to https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/computer-science
2. Scrape the first page of listings (<td> elements inside <tr>)
3. Output data as importable CSB (Outdated step: Turn the collected data into JSON)
4. Store the JSON to file, where it can be accessed by the Py-SQL script

"""
# scholscrape_new.py -- optimized for Python v3.7.3.

# CONTRIBUTORS: Peyton Pritchard, Joe Maggio

# REFERENCES:
# https://www.geeksforgeeks.org/implementing-web-scraping-python-beautiful-soup/

# This is an HTML scraper that does the following:
# 	1. Go to https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/computer-science
# 	2. Scrape the first page of listings (<td> elements inside <tr>)
# 	3. Output data as importable CSB (Outdated step: Turn the collected data into JSON)
# 	4. Store the JSON to file, where it can be accessed by the Py-SQL script


# TODO Delete duplicate scholarships from .csv file or decide to remove duplicates at Database level.

import csv  # For writing data to .CSV file
from datetime import date  # For titling the CSV file
import html5lib  # For parsing HTML
import requests  # For querying HTML from websites
from time import sleep
from bs4 import BeautifulSoup  # BeautifulSoup4, the parse tree module
from os import environ
from scrape import scrape, toAmount, toDate



def get_scholarshipscom_details(url, appendable_url, filename):
    """Get the details from the academic major page and save them to a .csv file.

    Args:
            url (str): Url to scholarship page
            appendable_url (str): Base site url
            filename (str): .csv to save scholarships to

    """
    response = get_response(appendable_url + url)
    soup = BeautifulSoup(response.content, 'html5lib')

    # Get scholarship table
    scholarshipList = []
    table = soup.find('tbody')

    # Get elements from table
    for row in table.findAll('tr'):
        scholarship = {}
        scholarship['name'] = row.find(
            'td', attrs={'class': 'scholtitle'}).text
        scholarship['url'] = appendable_url + str(row.a['href'])
        scholarship['amount'] = toAmount(row.find(
            'td', attrs={'class': 'scholamt'}).text)
        scholarship['deadline'] = toDate(row.find(
            'td', attrs={'class': 'scholdd'}).text)
        scholarshipList.append(scholarship)

    # print(scholarshipList)

    # Write scholarships to file
    with open(filename, 'a', encoding='utf-8-sig') as f:
        w = csv.DictWriter(f, ['name', 'url', 'amount', 'deadline'])
        for scholarship in scholarshipList:
            w.writerow(scholarship)


def get_response(url):
    """Connect to website, stopping the program if response code not OK.

    Args:
            url (str): String url to get request

    Returns:
            response: Response object

    """
    try:
        response = requests.get(url)
    except requests.RequestException as e:
        print(e)
        exit(1)

    return response


def main():
    """Code for scraper."""
    url = "https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major"
    # Use to make URL attribute of scholarship object usable
    appendable_url = "https://www.scholarships.com"

    # Setup output file
    scan_time = date.today()
    filename = 'scan_' + str(scan_time) + '.csv'
    with open(filename, 'w',encoding='utf-8-sig') as f:
        w = csv.DictWriter(f, ['name', 'url', 'amount', 'deadline'])
        w.writeheader()

    # get response
    response = get_response(url)

    soup = BeautifulSoup(response.content, 'html5lib')
    url_table = soup.find(id="ullist")
    url_list = url_table.find_all('a')
    for link in url_list:
        get_scholarshipscom_details(link.get('href'), appendable_url, filename)
        # Wait 1 second between requests
        sleep(1)

    scrape(environ['MYSQL_USER'], environ['MYSQL_PASSWORD'], "db", environ['MYSQL_DB_NAME'])

    print("done")


if __name__ == "__main__":
    main()
