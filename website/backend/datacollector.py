import threading
from time import sleep
import json


class Temperature:
    def __init__(self, filelocation='./temperature.json', timeframe=360):
        self.filelocation = filelocation
        self.timeframe = timeframe
        self.data = []
        self.thread = threading.Thread(target=self.runner, daemon=True)
        self.thread.start()

    def runner(self):
        while True:
            self.fetch_data()
            sleep(self.timeframe)

    def fetch_data(self):
        with open(self.filelocation, 'r') as file:
            self.data = json.load(file)

    def get(self):
        return self.data
