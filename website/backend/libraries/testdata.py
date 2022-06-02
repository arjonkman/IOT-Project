import sqlite3
import random

# Insert test data into roomdata table containing temperature humidity and light data for each room and with random values for each data point between 0 and 100


class TestData:
    def __init__(self, db):
        self.db = db

    def insert_test_data(self):
        rooms = self.db.execute("SELECT * FROM Room")
        for room in rooms.fetchall():
            print(room)
            for _ in range(0, 3):
                for i in range(0, 3):
                    date = self.generate_date()
                    data = self.generate_data()
                    if i == 0:
                        dataType = 'temperature'
                    elif i == 1:
                        dataType = 'humidity'
                    elif i == 2:
                        dataType = 'light'
                    print(
                        f'Inserting data for room {room[0]} of type {dataType} at {date}')
                    self.db.execute("INSERT INTO RoomData (RoomId, Date, DataType, Data) VALUES (?, ?, ?, ?)", [
                                    room[0], date, dataType, data])

    def generate_date(self):
        # return a random date between 1/1/2020 and 1/1/2021
        return random.randint(1577836800, 1580367999)

    def generate_data(self):
        # return a random value for the given data type
        return random.randint(0, 400)


if __name__ == '__main__':
    conn = sqlite3.connect('database.db')
    db = conn.cursor()
    test = TestData(db)
    test.insert_test_data()
    conn.commit()
    conn.close()
