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

    def data(self, roomId):
        try:
            data = []
            light = self.db.execute(
                'SELECT DataType, Data, Date FROM RoomData WHERE RoomId = ? AND DataType = "light" ORDER BY Date ASC LIMIT 1;', [roomId])
            temperature = self.db.execute(
                'SELECT DataType, Data, Date FROM RoomData WHERE RoomId = ? AND DataType = "temperature" ORDER BY Date ASC LIMIT 1;', [roomId])
            humidity = self.db.execute(
                'SELECT DataType, Data, Date FROM RoomData WHERE RoomId = ? AND DataType = "humidity" ORDER BY Date ASC LIMIT 1;', [roomId])
            data += [{
                'date': light[0][2],
                'type': light[0][0],
                'data': light[0][1]
            }]
            data += [{
                'date': temperature[0][2],
                'type': temperature[0][0],
                'data': temperature[0][1]
            }]
            data += [{
                'date': humidity[0][2],
                'type': humidity[0][0],
                'data': humidity[0][1]
            }]
            return data
        except Exception:
            return False
        return False

    def get_light(self, none=None):
        data = ''
        try:
            data = self.db.execute(
                "SELECT RoomId, Data FROM RoomData WHERE DataType = 'light' ORDER BY Date DESC")
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
