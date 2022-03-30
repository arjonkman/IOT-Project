from flask import Flask, jsonify, request
from flask_cors import CORS
from datacollector import Humidity
import os

app = Flask(__name__)
CORS(app)

humidity = Humidity(timeframe=1)


@app.route('/api/humidity/<begin>/<end>/<kamer>', methods=['GET'])
def api(begin, end, kamer):
    humidity.filelocation = f'{kamer}.csv'
    json = jsonify(humidity.get(begin, end))
    return json


@app.route('/api/upload', methods=['POST'])
def upload():
    try:
        file = request.files['file']
        if '.csv' in file.filename:
            path = app.root_path + '/csv/'
            file.save(os.path.join(path, file.filename))
            return 'File uploaded successfully'
        return 'File not supported'
    except:
        return 'Upload failed'


if __name__ == '__main__':
    app.run(debug=True)
