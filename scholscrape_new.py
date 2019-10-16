#scholscrape_new.py -- optimized for Python v3.7.3.
#CONTRIBUTORS: Peyton Pritchard, 

#REFERENCES:
# https://www.geeksforgeeks.org/implementing-web-scraping-python-beautiful-soup/

# This is an HTML scraper that does the following:
# 	1. Go to https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/computer-science
#	2. Scrape the first page of listings (<td> elements inside <tr>)
#	3. Output data as importable CSB (Outdated step: Turn the collected data into JSON)
#	4. Store the JSON to file, where it can be accessed by the Py-SQL script

#UPDATES: Last updated 15 Oct - removed glitchy ScholarshipMonkey code.
#
# Need help from Joe - says there's a way to go into a link, scrape
# its data, then back out. If so, we can use CollegeBoard and ScholarshipMonkey,
# as well as other sections of Scholarships.com, as data sources.

from bs4 import BeautifulSoup 	# BeautifulSoup4, the parse tree module
import requests			# For querying HTML from websites
import html5lib 		# For parsing HTML
import csv			# For writing data to .CSV file
from datetime import date	# For titling the CSV file

url = "https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/computer-science"
appendable_url = "https://www.scholarships.com" # Use to make URL attribute of scholarship object usable
# Connect to website, stopping the program if response code not OK
try:
	response = requests.get(url)
except exceptions.RequestException as e:
	print(e)
	sys.exit(1)

soup = BeautifulSoup(response.content, 'html5lib')
scholarshipList = []
table = soup.find('tbody')

# Get elements from table
for row in table.findAll('tr'):
	scholarship = {}
	scholarship['name'] = row.find('td', attrs = {'class':'scholtitle'}).text
	scholarship['url'] = appendable_url+str(row.a['href'])
	scholarship['amount'] = row.find('td', attrs = {'class':'scholamt'}).text
	scholarship['deadline'] = row.find('td', attrs = {'class':'scholdd'}).text
	scholarshipList.append(scholarship)

print(scholarshipList)

scan_time = date.today()
filename = 'scan_'+str(scan_time)+'.csv'

with open(filename, 'w') as f:
	w = csv.DictWriter(f, ['name','url','amount','deadline'])
	w.writeheader()
	for scholarship in scholarshipList:
		w.writerow(scholarship)


print("Done")