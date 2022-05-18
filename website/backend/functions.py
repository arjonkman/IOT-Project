import csv
import os
import sqlite3
from hashlib import sha1


def get_rooms():
    """
    Returns a list of all rooms."""
    with sqlite3.connect('database.db') as db:
        cursor = db.cursor()
        cursor.execute('SELECT * FROM rooms')
        return cursor.fetchall()


class Illuminance:
    def __init__(self, filelocation):
        self.filelocation = filelocation

    def to_json(self):
        headerData = []
        valueData = []
        with open(self.filelocation, 'r') as file:
            reader = csv.reader(file)
            header = True
            for row in reader:
                if row == []:
                    header = True
                    continue
                if header:
                    header = False
                    if row[0] == 'building':
                        attributes = row
                        values = next(reader)
                        headerData.append({
                            attributes[0]: values[0],
                            attributes[1]: values[1],
                            attributes[2]: values[2],
                            attributes[3]: values[3]
                        })
                    continue
                valueData.append({
                    "date": row[0],
                    "value": row[1]
                })
        return [headerData, valueData]

    def get_add(self):
        header, value = self.to_json()
        print(value[0]['value'])
        return float(400 - float(value[0]['value']))


class Database:
    def __init__(self, database):
        self.database = database

    def login(self, email, password):
        with sqlite3.connect(self.database) as db:
            res = db.execute(
                'SELECT * FROM users WHERE email = ? AND password = ?', (email, password))
            data = res.fetchall()
            if data == []:
                return {'message': 'Invalid email or password'}
            # TODO Create a session on the database and send the session id to the user
            session_id = sha1(os.urandom(128)).hexdigest()
        return {'success': True, 'session_id': session_id}

    def check_session(self, session_id):
        ...

    def destroy_session(self, session_id):
        ...

    def create_session(self, email):
        ...


if __name__ == '__main__':
    il = Illuminance('./Webtech_Studeerkamer_A81758FFFE053FDB-Illuminance.csv')
