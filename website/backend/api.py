from flask import Flask, jsonify
from flask_cors import CORS
from datacollector import Temperature


temp = Temperature(timeframe=1)
app = Flask(__name__)
CORS(app)


@app.route('/api/temperature', methods=['GET'])
def api():
    return jsonify(temp.get())


if __name__ == '__main__':
    app.run(debug=True)
