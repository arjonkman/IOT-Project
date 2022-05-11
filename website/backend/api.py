from flask import Flask, request, jsonify
from flask_cors import CORS
from functions import *

app = Flask(__name__)
CORS(app)


@app.route('/api')
def index():
    function = request.args.get('function')
    if function == 'get_rooms':
        return jsonify(get_rooms())
    elif function == 'light_intensity':
        return jsonify(light_intensity())
    elif function == 'login':
        email = request.args.get('email')
        password = request.args.get('password')
        return jsonify(account(email, password))
    return jsonify({'error': 'Invalid function'})


if __name__ == '__main__':
    app.run(debug=False)
