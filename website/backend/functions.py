import threading
from time import sleep
import json
import csv
from flask import jsonify


from datetime import datetime, timedelta
from hashlib import sha1
import sqlite3
import os


import threading
from time import sleep
import json
import csv
from flask import jsonify


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



class Lux:
    def __init__(self, filelocation='./Webtech_Studeerkamer_A81758FFFE053FDB-Illuminance.csv', timeframe=360):
        self.filelocation = filelocation
        self.timeframe = timeframe
        self.data = []
        self.to_json()
        self.thread = threading.Thread(target=self.runner, daemon=True)
        self.thread.start()

    def runner(self):
        while True:
            self.fetch_data()
            sleep(self.timeframe)

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

    def fetch_data(self):
        if self.filelocation[self.filelocation.index('.'):] == '.csv':
            self.data = self.to_json()
        else:
            with open(self.filelocation, 'r') as file:
                self.data = json.load(file)

    def get(self):
        return self.data


def light_intensity():
    """ a function that converts light intensity values to difference needed
    """ 
    lux_needed = []

    lux_data = Lux(filelocation='Webtech_Studeerkamer_A81758FFFE053FDB-Illuminance.csv', timeframe=1)
    lux_data_json = lux_data.to_json()

    for i in range(4064):
        # * lux needed: 300-500, dus we gaan uit van 400 lux

        lux = lux_data_json[1][i]['value']
        lux_needed += [int(400 - float(lux))]
    return lux_needed


def account(email, password):
    with sqlite3.connect('database.db') as db:
        res = db.execute(
            'SELECT * FROM users WHERE email = ? AND password = ?', (email, password))
        data = res.fetchall()
        if data == []:
            return {'message': 'Invalid email or password'}
        session_id = sha1(os.urandom(128)).hexdigest()
    return {'success': True, 'session_id': session_id}

    lux_data = Lux(filelocation='Webtech_Studeerkamer_A81758FFFE053FDB-Illuminance.csv', timeframe=1)
    lux_data_json = lux_data.to_json()

    for i in range(4064):
        # * lux needed: 300-500, dus we gaan uit van 400 lux

        lux = lux_data_json[1][i]['value']
        lux_needed += [int(400 - float(lux))]
    return lux_needed
