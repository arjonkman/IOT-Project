from hashlib import sha1
import sqlite3
import os
import csv


def get_rooms():
    """
    Returns a list of all rooms."""
    return [
        {'id': 'A201_ZP11', 'name': 'A201', 'building': 'ZP11'},
        {'id': 'A225_ZP11', 'name': 'A225', 'building': 'ZP11'},
        {'id': 'A124_ZP11', 'name': 'A125', 'building': 'ZP11'},
        {'id': 'A147_ZP11', 'name': 'A147', 'building': 'ZP11'},
        {'id': 'D211_ZP11', 'name': 'D211', 'building': 'ZP11'},
        {'id': 'D225_ZP11', 'name': 'D225', 'building': 'ZP11'},
        {'id': 'D125_ZP11', 'name': 'D125', 'building': 'ZP11'},
        {'id': 'D147_ZP11', 'name': 'D147', 'building': 'ZP11'},
        {'id': 'D211_ZP11', 'name': 'D211', 'building': 'ZP11'},
        {'id': 'D225_ZP11', 'name': 'D225', 'building': 'ZP11'},
        {'id': 'U132_ZP07', 'name': 'U132', 'building': 'ZP07'},
        {'id': 'U133_ZP07', 'name': 'U133', 'building': 'ZP07'},
        {'id': 'U134_ZP07', 'name': 'U134', 'building': 'ZP07'},
        {'id': 'U135_ZP07', 'name': 'U135', 'building': 'ZP07'},
    ]


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
