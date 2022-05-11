from datetime import datetime, timedelta
from hashlib import sha1
import sqlite3
import os


def get_rooms():
    """
    Returns a list of all rooms."""
    return [
        {'id': 1, 'name': 'Room 1', 'building': 'Building 1'},
        {'id': 2, 'name': 'Room 2', 'building': 'Building 2'},
        {'id': 3, 'name': 'Room 3', 'building': 'Building 2'},
        {'id': 4, 'name': 'Room 4', 'building': 'Building 4'},
        {'id': 5, 'name': 'Room 5', 'building': 'Building 3'},
    ]


def light_intensity():
    pass


def account(email, password):
    with sqlite3.connect('database.db') as db:
        res = db.execute(
            'SELECT * FROM users WHERE email = ? AND password = ?', (email, password))
        data = res.fetchall()
        if data == []:
            return {'message': 'Invalid email or password'}
        else:
            session_id = sha1(os.urandom(128)).hexdigest()
            db.execute('INSERT INTO sessions VALUES (?, ?, ?)',
                       (session_id, datetime.now(), datetime.now() + timedelta(hours=1)))
    return {'success': True, 'session_id': session_id}


def active_session(session_id):
    with sqlite3.connect('database.db') as db:
        res = db.execute(
            'SELECT expires FROM sessions WHERE session_id = ?', (session_id,))
        if res.fetchone() == None:
            return {'message': 'Invalid session'}
        elif res.fetchone()[0] < datetime.now():
            return {'message': 'Session expired'}
        else:
            db.execute('UPDATE sessions SET expires = ? WHERE session_id = ?',
                       (datetime.now() + timedelta(hours=1), session_id))
            return {'success': True}
