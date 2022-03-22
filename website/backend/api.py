from flask import Flask, jsonify
from flask_cors import CORS
from datacollector import Humidity


humidity = Humidity(filelocation='kamer.csv', timeframe=1)
app = Flask(__name__)
CORS(app)


@app.route('/api/humidity', methods=['GET'])
def api():
    return jsonify(humidity.get())


if __name__ == '__main__':
    app.run(debug=True)
