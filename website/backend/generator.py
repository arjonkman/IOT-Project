import random
from datetime import datetime, timedelta
import json


def temperature(start=21, len=50):
    data = {}
    date = datetime.now()
    for i in range(len):
        min = random.randint(0, 2)
        max = random.randint(0, 2)
        temp = random.randint(start-min, start+max)
        data[date.strftime("%y-%m-%d-%H-%M")] = temp
        date = date + timedelta(minutes=5)
    return data


def main():
    temps = temperature(21, 10000)
    with open('temperature.csv', 'w') as file:
        array_len = len(temps)
        current_len = 0
        for temp in temps:
            current_len += 1
            file.write(f'{temp},') if array_len != current_len else file.write(
                f'{temp}')


if __name__ == '__main__':
    with open('temperature.json', 'w') as file:
        file.write(json.dumps(temperature()))
