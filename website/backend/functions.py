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
        if res.fetchall() == []:
            return {'message': 'Invalid email or password'}
    return {'success': True, 'session_id': sha1(os.urandom(128)).hexdigest()}
