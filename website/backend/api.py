from flask import Flask, request, jsonify
from flask_cors import CORS
from functions import *

app = Flask(__name__)
CORS(app)

light = Illuminance(
    './Webtech_Studeerkamer_A81758FFFE053FDB-Illuminance.csv')
db = Database('./database.db')


def auth(func, args):
    if db.check_session(request.args.get('session_id')):
        return func(args)
    else:
        # TODO destroy session_id on server and on client
        ...


@app.route('/api')
def index():
    function = request.args.get('function')
    if function == 'get_rooms':
        return jsonify(get_rooms())
    elif function == 'light_intensity':
        return jsonify(light.get_add())
    elif function == 'light_data':
        return jsonify(light.to_json())
    elif function == 'login':
        return jsonify(db.login(request.args.get('email'), request.args.get('password')))
    return jsonify({'error': 'Invalid function'})


if __name__ == '__main__':
    app.run(debug=False)
    # app.run(debug=False, ssl_context='adhoc') # To run with HTTPS
