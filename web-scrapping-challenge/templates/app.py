from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_""

app = Flask(__name__)

app.config("MONGO_URL") =""
mongo= PyMongo(app)


@app.route("/")
def index():


if __name__ == "__main__"
app.run(debug=True)