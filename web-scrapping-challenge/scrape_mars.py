
from bs4 import BeautifulSoup as bs
from splinter import Browser
import pandas as pd
import os
import time
import requests


def scrape():
	mars_info ={}
	executable_path = {'executable_path': 'chromedriver'}
	browser = Browser('chrome', **executable_path, headless=False)


	url = "https://mars.nasa.gov/news/"
	browser.visit(url)


	html = browser.html


	soup = bs(html, 'html.parser')
	news_title = soup.find('div', class_='content_title').text
	news_p = soup.find('div', class_='article_teaser_body').text
	print(news_title)
	print(news_p)
	mars_info["news_title"] = news_title
	mars_info["news_p"] = news_p
	browser.quit()



	executable_path = {'executable_path': 'chromedriver'}
	browser = Browser('chrome', **executable_path, headless=False)
	featured_image_url="https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
	browser.visit(featured_image_url)

	html_image = browser.html

#Beautful soup
	soup = bs(html_image, "html.parser")
	image_url  = soup.find('article')['style'].replace('background-image: url(','').replace(');', '')[1:-1]

#url 
	main_url = "https://www.jpl.nasa.gov"

	image_url = main_url + image_url


	executable_path = {'executable_path': 'chromedriver'}
	browser = Browser('chrome', **executable_path, headless=False)

	url = "https://space-facts.com/mars/"
	browser.visit(url)
	#Use Pandas to "read_html" to parse the URL
	tables = pd.read_html(url)
	#Mars Facts
	df = tables[0]
	df.columns = ['Description', 'Mars']
	html_table = df.to_html(table_id="html_tbl_css",justify='left',index=False)
	data = df.to_dict(orient='records')  
	df

	mars_df = df.to_html(classes = 'table table-striped')
	print(mars_df)


	executable_path = {'executable_path': 'chromedriver'}
	browser = Browser('chrome', **executable_path, headless=False)
# Mars Hemispheres

# In[14]:


	hemispheres_url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
	browser.visit(hemispheres_url)


# In[15]:

	html_hemispheres = browser.html

	soup = bs(html_hemispheres, 'html.parser')

	items = soup.find_all('div', class_='item')
 
	hemisphere_image_urls = []

	hemispheres_main_url = 'https://astrogeology.usgs.gov'

	for i in items:
		title = i.find('h3').text
		partial_img_url = i.find('a', class_='itemLink product-item')['href']
		browser.visit(hemispheres_main_url + partial_img_url)
		partial_img_html = browser.html
		soup = bs( partial_img_html, 'html.parser')
		img_url = hemispheres_main_url + soup.find('img', class_='wide-image')['src']
		hemisphere_image_urls.append({"title" : title, "img_url" : img_url})
	hemisphere_image_urls

	return mars_info