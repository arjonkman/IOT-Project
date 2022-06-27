from flask import Flask, request, jsonify
from flask_cors import CORS
import threading
import schedule
import time

from libraries.Database import Database
from libraries.Rooms import Rooms
from libraries.Sessions import Sessions
from libraries.Account import Account
from libraries.unicaApi import Data

app = Flask(__name__)
CORS(app)

db = Database('./database.db')
rooms = Rooms(db)
sessions = Sessions(db)
account = Account(db)
data = Data(db, 'e-client-hanzehogeschool-01',
            'JZ!oeC13ZqjNOL(c3WhED*RvsQcU!ER5QJf')
print('Starting server...')
print('This can take a while...')
# data.data_to_database()


def update_data():
    # data = Data(db, 'e-client-hanzehogeschool-01',
    #             'JZ!oeC13ZqjNOL(c3WhED*RvsQcU!ER5QJf')
    # data.latest_to_database(data.bearer, data.db)
    pass


def auth(parameters, func, *args):
    if not sessions.check_session(parameters.get('session_id')):
        # Delete session from database and send an status message for the client
        sessions.delete_session(parameters.get('session_id'))
        return {'status': 'session_id invalid'}
    threading.Thread(
        target=sessions.update_sessions, args=(parameters.get('session_id'),)).start()
    return func(*args)


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
    if function.upper() == 'DATA':
        return jsonify(auth(request.args, rooms.data, request.args.get('id'), request.args.get('type')))
    if function.upper() == 'LATEST_DATA':
        return jsonify(auth(request.args, rooms.latest_data), None)
    if function.upper() == 'GET_LIGHT':
        return jsonify(auth(request.args, rooms.get_light, request.args.get('id')))
    if function.upper() == 'DELETE_SESSION':
        return jsonify(sessions.delete_session(request.args.get('session_id')))
    if function.upper() == 'UPDATE_ROOM_NAME':
        return jsonify(auth(request.args, rooms.update_room_name, request.args.get('id'), request.args.get('name')))
    if function.upper() == 'GET_ROOM_NAME':
        return jsonify(auth(request.args, rooms.get_room_name, request.args.get('id')))
    if function.upper() == 'GET_LIGHTS':
        return jsonify(auth(request.args, rooms.get_lights, request.args.get('type')))
    if function.upper() == 'ASSIGN_LIGHT':
        return jsonify(auth(request.args, rooms.assing_light, request.args.get('room'), request.args.get('light')))
    return jsonify({'error': 'You have no access to this API'})


def run():
    schedule.every(1).minutes.do(update_data)
    while True:
        schedule.run_pending()
        time.sleep(1)


if __name__ == '__main__':
    threading.Thread(target=run).start()
    app.run(debug=True, host='0.0.0.0',  port=2053)
    # app.run(debug=False, host='0.0.0.0', ssl_context=('/etc/letsencrypt/live/ettudo.com-0001/fullchain.pem',
    #         '/etc/letsencrypt/live/ettudo.com-0001/privkey.pem'), port=2053)
