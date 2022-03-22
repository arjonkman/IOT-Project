import threading
from time import sleep
import json
import csv


class Humidity:
    def __init__(self, filelocation='./humidity.json', timeframe=360):
        self.filelocation = filelocation
        self.timeframe = timeframe
        self.data = []
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
                valueData.insert(0, {
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
