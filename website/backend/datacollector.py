import pandas as pd
import threading
from time import sleep
import json
import csv


class Humidity:
    """Object to get JSON data from a certain file
    """

    def __init__(self, timeframe=360):
        """Initialize the Humidity object with all the data needed

        Args:
            filelocation (str, optional): file location of file to read content from. Defaults to './humidity.json'.
            timeframe (int, optional): time between the automatically fetching of data from the selected file. Defaults to 360.
        """
        self.filelocation = ''
        self.timeframe = timeframe
        self.data = []

    # def runner(self):
    #     """Run the data fetcher once every self.timeframe times
    #     """
    #     while True:
    #         self.fetch_data()
    #         sleep(self.timeframe)

    def to_json(self):
        """Get CSV file and Return the file in a JSON format

        Returns:
            array: Returns a 2d array, first element is the header data,
                   second element is all the values
        """
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
        """Get data of selected file and load the json data of that file in self.data
        """
        if self.filelocation[self.filelocation.index('.'):] == '.csv':
            self.data = self.to_json()
        else:
            with open(self.filelocation, 'r') as file:
                self.data = json.load(file)

    def get(self, begin, end):
        """Return the data in a json format

        Returns:
            <JSON Object>: Returns a JSON object of the selected data
        """
        self.fetch_data()
        removeL = []
        for i, item in enumerate(self.data[1]):
            date = pd.to_datetime(item['date']).normalize()
            begin = pd.to_datetime(begin).normalize()
            end = pd.to_datetime(end).normalize()
            if not date >= begin or not date <= end:
                removeL += [i]
        for i, item in enumerate(removeL):
            self.data[1].pop(item-i)
        return self.data
