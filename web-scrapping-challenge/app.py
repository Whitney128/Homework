from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
mongo = PyMongo(app)

@app.route("/")
def home():
	#mars_info = scrape_mars.mars_info()
	mars_data = mongo.db.mars_info.find_one()
	print(mars_data)
	# return "test"
	return render_template("index.html", mars_data=mars_data)


@app.route("/scrape")
def scraper():
	mars_data = mongo.db.mars_data
	mars_info = mars_data.news_title()
	mars_info = mars_data.news_p()
	mars_info = mars_data.image_url()
	mars_info = mars_data.mars_df()
	mars_info = mars_data.hemisphere_image_url()
	#listings.update({}mars_data, upsert=True)
	#return redirect("/", code=302)



if __name__ == "__main__":
	app.run(debug=True)