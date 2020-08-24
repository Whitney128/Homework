%matplotlib inline
from matplotlib import style
style.use('fivethirtyeight')
import matplotlib.pyplot as plt

import numpy as np
import pandas as pd

 import datetime

 import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#connect engine to sqlite
engine = create_engine("sqlite:///Resources/hawaii.sqlite")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
Base.classes.keys()
 # Save references to each table
Measurement = Base.classes.measurement
Station = Base.classes.station
# Create our session (link) from Python to the DB
session = Session(engine)
#######################################
#flask setup
#######################################
app=Flask(_name_)
#######################################
#flask routes
#######################################
#Have the home page return the information of the different routes
@app.route("/")
#list all routes
return (
f"<p>All routes available:</p>"
f"/api/v1.0/precipitation<br/>Returns a JSON representation of percipitation data for the dates between 2016-08-23 to 2017-07-10/>""
f"/api/v1.0/stations<br/>Returns a JSON list of the weather stations<br/><br/>"
f"/api/v1.0/tobs<br/>Returns a JSON list of the Temperature Observations (tobs) for each station for the dates between {last_12mnth} and {last_date[0][0]}<br/><br/>"
f"/api/v1.0/<start>Returns a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range/>"
f"/api/v1.0/<start>/<end>Returns a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range/>"
)
#############################################################
@app.route("/api/v1.0/precipitation")
def precipitation():
    print("precipitation status:OK")
    #query to retrieve the last 12 months of precipitation data.
    results = session.query(Measurement.date, Measurement.prcp).filter(Measurement.date >= last_year).all()
    #Convert the query results to a Dictionary using date as the key and prcp as the value.
    prcp_totals = []
    for result in results:
        row = {}
        row["date"] = result[0]
        row["prcp"] = result[1]
        prcp_totals.append(row)
    #Return the JSON representation of your dictionary.
    return jsonify(prcp_totals)
 #########################################################
@app.route("/api/v1.0/stations")
def station():
    print("station status:OK")
    #a query to get the stations.
    stations_query = session.query(Station.station, func.count(Measurement.id)).select_from(Measurement).\
    join(Station, Measurement.station == Station.station).group_by(Station.station).\
    order_by(func.count(Measurement.id).desc()).all()
    stations = pd.read_sql(stations_query.statement, stations_query.session.bind)
    #Return a JSON list of stations from the dataset.
    return jsonify(stations.to_dict())
#########################################################
@app.route("/api/v1.0/tobs")
def tobs():
	print("tobs status:OK")
	#query for the dates and temperature observations from a year from the last data point
	tobs_results = session.query(func.min(Measurement.tobs), func.max(Measurement.tobs), func.avg(Measurement.tobs)).\
    filter(Measurement.station == most_active_station).all()
    # Create a list of dicts with `date` and `tobs` as the keys and values
	tobs_totals = []
	for result in tobs_results:
		row = {}
		row["date"] = result[0]
		row["tobs"] = result[1]
		tobs_totals.append(row)
	#Return a JSON list of Temperature Observations (tobs) for the previous year.
	return jsonify(tobs_totals)
#######################################################
@app.route("/api/v1.0/<start>")
def start_date(start):
	print("start_date status:OK")
	start_date = dt.datetime.strptime(start, '%Y-%m-%d').date()
	last_date_dd = (dt.datetime.strptime(last_date[0][0], '%Y-%m-%d')).date() 
	first_date_dd = (dt.datetime.strptime(first_date[0][0], '%Y-%m-%d')).date()
	#start_date greater or less than
	if start_date > last_date_dd or start_date < first_date_dd:
		return(f"Select date range between {first_date[0][0]} and {last_date[0][0]}")
	else:
		#Return a JSON list of the minimum temperature, the average temperature, 
		#and the max temperature for a given start range.
		start_min_max_temp = return session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
        filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).all()
        start_date_data = list(np.ravel(start_min_max_temp))
		return jsonify(start_date_data)
##########################################################
@app.route("/api/v1.0/<start>/<end>")
def end_date(start,end):
	print("start and end status:OK")
	start_date = dt.datetime.strptime(start, '%Y-%m-%d').date()
	end_date = dt.datetime.strptime(end, '%Y-%m-%d').date()
	last_date_dd = (dt.datetime.strptime(last_date[0][0], '%Y-%m-%d')).date() 
	first_date_dd = (dt.datetime.strptime(first_date[0][0], '%Y-%m-%d')).date()
	if start_date > last_date_dd or start_date < first_date_dd or end_date > last_date_dd or\
	 					end_date < first_date_dd:
		return(f"Select date range between {first_date[0][0]} and {last_date[0][0]}")
	else:
		#Return a JSON list of the minimum temperature, the average temperature, 
		#and the max temperature for a given start-end range.
		start_end_min_max_temp = return session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
        filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).all()
        filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).all()
		start_end_data = list(np.ravel(start_end_min_max_temp))
		return jsonify(start_end_data)
if __name__=="__main__":
	app.run(debug=True)
