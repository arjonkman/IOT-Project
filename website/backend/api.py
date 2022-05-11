from flask import Flask, request, jsonify
from functions import *

app = Flask(__name__)


@app.route('/')
def index():
    function = request.args.get('function')
    if function == 'get_rooms':
        return jsonify(get_rooms())


if __name__ == '__main__':
    app.run(debug=True)
