import requests
import datetime
import csv
import sqlite3
import time


class Data:
    def __init__(self, db, user, password) -> None:
        self.db = db
        self.user = user
        self.password = password
        self.bearer = self.get_auth_token()
        self.get_points()

    def get_auth_token(self):
        url = 'https://api.creamcookies.net/is/connect/token'
        data = {
            'client_id': self.user,
            'client_secret': self.password,
            'grant_type': 'client_credentials'
        }
        response = requests.post(url, data=data)
        return response.json()['access_token']

    def get_points(self):
        url = 'https://api.creamcookies.net/hs/read?filter=point'
        headers = {
            'Authorization': 'Bearer ' + self.bearer
        }
        response = requests.get(url, headers=headers)
        with open('./csv/points.csv', 'w') as f:
            f.write(response.text)
        return

    def get_data(self, point):
        now = datetime.datetime.now()
        nowutc = datetime.datetime.strftime(
            now, r'%Y-%m-%dT%H:%M:%SZ Amsterdam')
        notnow = now - datetime.timedelta(days=3)
        notnowutc = datetime.datetime.strftime(
            notnow, r'%Y-%m-%dT%H:%M:%SZ Amsterdam')
        url = f'https://api.creamcookies.net/hs/hisRead?id={point}&range={notnowutc},{nowutc}'
        headers = {
            'Authorization': 'Bearer ' + self.bearer
        }
        response = requests.get(url, headers=headers)
        return response.text

    def data_to_database(self):
        with open('./csv/points.csv', 'r') as f:
            csvFile = csv.reader(f)
            for row in csvFile:
                if row[0][0] == '@':
                    dat = row
                    with open(f'./csv/{row[1]}.csv', 'w') as file:
                        file.write(self.get_data(row[0]))
                    with open(f'./csv/{row[1]}.csv', 'r') as file:
                        csvFil = csv.reader(file)
                        for row in csvFil:
                            if row[0][0] == '2':
                                try:
                                    self.db.execute('INSERT INTO RoomData (RoomId, DataType, Data, Date) VALUES (?, ?, ?, ?)', [
                                        dat[1][:16], dat[10], row[1], row[0]])
                                except sqlite3.IntegrityError:
                                    pass
        return

    def latest_to_database(self):
        url = 'https://api.creamcookies.net/hs/readLatestValue'
        headers = {
            'Authorization': 'Bearer ' + self.bearer,
            'Content-Type': 'text/plain'
        }
        payload = "ver:\"3.0\"\r\nid"
        with open('./csv/points.csv', 'r') as f:
            csvFile = csv.reader(f)
            for row in csvFile:
                if row[0][0] == '@':
                    payload += f"\r\n{row[0]}"

        response = requests.post(url, headers=headers, data=payload)
        with open('./csv/latest.csv', 'w') as f:
            f.write(response.text)
        with open('./csv/latest.csv', 'r') as f:
            csvFile = csv.reader(f)
            for row in csvFile:
                if row[0][0] == '@':
                    with open('./csv/points.csv', 'r') as file:
                        csvFile = csv.reader(file)
                        for roww in csvFile:
                            if roww[0] == row[0]:
                                try:
                                    self.db.execute('INSERT INTO RoomData (RoomId, DataType, Data, Date) VALUES (?, ?, ?, ?)', [
                                        roww[1][:16], roww[10], row[2], row[1]])
                                except sqlite3.IntegrityError:
                                    pass
        return response.text
