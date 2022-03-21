import random
from datetime import datetime, timedelta
import json


def temperature(start=21, len=50):
    data = []
    date = datetime.now()
    for i in range(len):
        min = random.randint(0, 2)
        max = random.randint(0, 2)
        temp = random.randint(start-min, start+max)
        element = {
            "date": date.strftime("%y-%m-%d-%H-%M"),
            "value": temp
        }
        # Increase the time for the next datapoint by 5 minutes
        date = date + timedelta(minutes=5)

        data.append(element)
    return data


def main():
    with open('temperature.json', 'w') as file:
        file.write(json.dumps(temperature()))


if __name__ == '__main__':
    main()
