import threading
from time import sleep


class Temperature:
    def __init__(self, filelocation='./temperature.csv', timeframe=10):
        self.filelocation = filelocation
        self.timeframe = timeframe
        self.data = ['nice']
        self.thread = threading.Thread(target=self.runner, daemon=True)
        self.thread.start()

    def runner(self):
        while True:
            self.fetch_data()
            sleep(self.timeframe)

    def fetch_data(self):
        with open(self.filelocation, 'r') as file:
            self.data = file.readlines()[0].split(',')

    def get(self):
        return self.data
