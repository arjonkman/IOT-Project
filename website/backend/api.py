import csv
from flask import Flask, jsonify, request
from flask_cors import CORS
from datacollector import Humidity
import os

app = Flask(__name__)
CORS(app)

humidity = Humidity(timeframe=1)


@app.route('/api/humidity/<begin>/<end>/<kamer>', methods=['GET'])
def api(begin, end, kamer):
    humidity.filelocation = f'csv/{kamer}.csv'
    json = jsonify(humidity.get(begin, end))
    return json


if __name__ == '__main__':
    app.run(host='0.0.0.0')
