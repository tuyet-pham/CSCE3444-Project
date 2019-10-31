from flask import Flask, render_template
from dbScholarscrape import *

app = Flask(__name__)

@app.route('/')

@app.route('/index.html')
def index():
    db = dbScholarscrape()
    data = db.displayListing()
    return render_template('index.html', data=data)

@app.route('/about.html')
def about():
    return render_template('about.html')


if __name__ == "__main__":
    app.run(debug=True)