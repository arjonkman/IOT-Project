from flask import Flask, jsonify
from flask_cors import CORS
from datacollector import Humidity


humidity = Humidity(filelocation='kamer.csv', timeframe=1)
app = Flask(__name__)
CORS(app)


@app.route('/api/humidity/<begin>/<end>', methods=['GET'])
def api(begin, end):
    json = jsonify(humidity.get(begin, end))
    return json


if __name__ == '__main__':
    app.run(debug=True)
