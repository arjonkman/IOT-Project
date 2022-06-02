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
        dataList = []
        try:
            data = self.db.execute(
                "SELECT Date, DataType, Data FROM RoomData WHERE RoomId = ? ORDER BY Date LIMIT 3", [roomId])
            for row in data:
                date = row[0]
                type = row[1]
                data = row[2]
                dataList += [{'date': date,
                             'type': type, 'data': data}]
            return dataList
        except Exception:
            return False

    def get_light(self):
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
