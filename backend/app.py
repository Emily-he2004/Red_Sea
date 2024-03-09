#import libraries
from flask import Flask, jsonify, request
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
import numpy as np
import requests
import pandas as pd
import math
import requests



# Import files
df = pd.read_csv("paste the path to you gaza_danger_levels.csv")
df_camp = pd.read_csv("paste the path to your refugee_camps.csv")

app = Flask(__name__)

# Fetching MAPBOX token
MAPBOX_TOKEN = 'pk.eyJ1IjoiZ3ByZW0wOSIsImEiOiJjbHRmbjhzd3gwcHNpMmxwMWpwdnlja2t6In0.xm3aMSxFMVQkpgJlOFUhVg'

@app.route('/mapbox-token', methods=['GET'])
def get_mapbox_token():
    return jsonify({'mapboxToken': MAPBOX_TOKEN})

# Machine learning KNN model with (LAT,LONG) and associated danger_level
X = df[['LATITUDE', 'LONGITUDE']].values
y = df['overall_danger'].astype(int).values
knn = KNeighborsClassifier(n_neighbors=1)
knn.fit(X, y)

@app.route('/safest-route', methods=['GET'])
def find_safest_route():    
    start_lat = request.args.get('start_lat')
    start_long = request.args.get('start_long')

    end_lat = request.args.get('end_lat')
    end_long = request.args.get('end_long')
    
    if not start_lat or not start_long or not end_lat or not end_long:
        return jsonify({'message': 'Missing end_lat or end_long parameters'}), 400

    url = f"https://api.mapbox.com/directions/v5/mapbox/walking/{start_long},{start_lat};{end_long},{end_lat}?geometries=geojson&alternatives=true&access_token={MAPBOX_TOKEN}"
    response = requests.get(url)
   
    app.run(debug=True, port=8000)
 
    