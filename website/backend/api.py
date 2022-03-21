from flask import Flask, jsonify
from datacollector import Temperature


temp = Temperature(timeframe=1)
app = Flask(__name__)


@app.route('/api/v1', methods=['GET'])
def api():
    data = ''
    return jsonify(temp.get())


if __name__ == '__main__':
    app.run(debug=True)
