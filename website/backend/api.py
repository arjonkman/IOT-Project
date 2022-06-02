from flask import Flask, request, jsonify
from flask_cors import CORS
import threading

from libraries.Database import Database
from libraries.Rooms import Rooms
from libraries.Sessions import Sessions
from libraries.Account import Account

app = Flask(__name__)
CORS(app)

db = Database('./database.db')
rooms = Rooms(db)
sessions = Sessions(db)
account = Account(db)


def auth(parameters, func, args=None):
    if not sessions.check_session(parameters.get('session_id')):
        # Delete session from database and send an status message for the client
        sessions.delete_session(parameters.get('session_id'))
        return {'status': 'session_id invalid'}
    threading.Thread(
        target=sessions.update_sessions, args=(parameters.get('session_id'),)).start()
    return func(args)


@app.route('/api', methods=['GET'])
def index():
    session_id = request.args.get('session_id')
    function = request.args.get('function')
    if function == None:
        return jsonify({'error': 'function not set'})
    if session_id is not None:
        if function.upper() == 'GET_ROOMS':
            return jsonify(auth(request.args, rooms.get_rooms, request.args.get('room')))
    if function.upper() == 'LOGIN':
        user = account.login(request.args)
        if user != []:
            return jsonify(sessions.create_session(user[0]))
        return jsonify({'error': 'Incorrect Email or Username'})
    if function.upper() == 'LIGHT_INTENSITY':
        return jsonify(auth(request.args, rooms.light_intensity, request.args.get('id')))
    if function.upper() == 'DELETE_SESSION':
        return jsonify(sessions.delete_session(request.args.get('session_id')))
    return jsonify({'error': 'You have no access to this API'})


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0',  port=2053)
    # app.run(debug=False, host='0.0.0.0', ssl_context=('/etc/letsencrypt/live/ettudo.com-0001/fullchain.pem',
    #         '/etc/letsencrypt/live/ettudo.com-0001/privkey.pem'), port=2053)
