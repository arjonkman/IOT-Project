import datetime


class Rooms():
    def __init__(self, db):
        self.db = db

    def create_room(self, name, building):
        self.db.execute(
            "INSERT INTO Room (Name, Building) VALUES (?, ?)", [name, building])

    def get_rooms(self, room='all'):
        if room == 'all':
            return self.db.execute("SELECT * FROM Room")
        return self.db.execute("SELECT * FROM Room WHERE Id = ?", [room])

    def update_room(self, id, name, building):
        try:
            self.db.execute(
                "UPDATE Room SET (Name, Building) VALUES (?, ?) WHERE Id = ?", [name, building, id])
        except Exception:
            return False
        return True

    def delete_room(self, id):
        try:
            self.db.execute('DELETE FROM Room WHERE id = ?', [id])
        except Exception:
            return False
        return True

    def data(self, roomId, dataType):
        data = ''
        ret_data = []
        try:
            data = self.db.execute(
                "SELECT Data, Date FROM RoomData WHERE RoomId = ? AND DataType = ? ORDER BY Date DESC LIMIT 1000", [roomId, dataType])
            for i in data:
                time = '%Y-%m-%dT%H:%M:%S-00:00 Amsterdam'
                date = datetime.datetime.strptime(
                    i[1], time)
                date = date.strftime('%Y-%m-%dT%H:%M:%S-00:00')
                ret_data.append({'data': i[0],
                                 'date': date})
            ret_data = ret_data[::-1]

            return ret_data
        except Exception as e:
            print(e)
            return False

    def latest_data(self, roomId):
        i = 0
        try:
            while i < 10:
                data = []
                light = self.db.execute(
                    'SELECT Data FROM RoomData WHERE RoomId = ? AND DataType = "illuminance" ORDER BY Date DESC LIMIT 1;', [roomId])
                temperature = self.db.execute(
                    'SELECT Data FROM RoomData WHERE RoomId = ? AND DataType = "temperature" ORDER BY Date DESC LIMIT 1;', [roomId])
                humidity = self.db.execute(
                    'SELECT Data FROM RoomData WHERE RoomId = ? AND DataType = "humidity" ORDER BY Date DESC LIMIT 1;', [roomId])
                print(light)
                try:
                    if light[0] is not None:
                        data += [{'type': 'light', 'data': light[0][0]}]
                    if temperature[0] is not None:
                        data += [{'type': 'temperature',
                                  'data': temperature[0][0]}]
                    if humidity[0] is not None:
                        data += [{'type': 'humidity', 'data': humidity[0][0]}]
                except:
                    i += 1
                return data
        except:
            return False

    def get_light(self, none=None):
        data = ''
        try:
            data = self.db.execute(
                "SELECT RoomId, Data FROM RoomData WHERE DataType = 'illuminance' ORDER BY Date DESC")
            L = []
            ret_data = []
            for item in data:
                if item[0] in L:
                    pass
                else:
                    ret_data += [{'roomId': item[0], 'data': item[1]}]
                    L += [item[0]]
            return ret_data
        except Exception:
            return False
