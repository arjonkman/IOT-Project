import datetime
from libraries.philipsControl import PhilipsControl


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

    def update_room_name(self, id, name):
        try:
            data = self.db.execute(
                "UPDATE Room SET Name = ? WHERE Id = ?", [name, id])
            print(data)
        except Exception as e:
            return False

    def get_room_name(self, id):
        try:
            return self.db.execute(
                "SELECT Name FROM Room WHERE Id = ?", [id])[0][0]
        except Exception:
            return False

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
            return False

    def latest_data(self, none=None):
        i = 0
        try:
            while i < 10:
                roomIds = self.db.execute(
                    "SELECT Id FROM Room")
                data = []
                for roomId in roomIds:
                    roomId = roomId[0]
                    light = self.db.execute(
                        'SELECT Data FROM RoomData WHERE RoomId = ? AND DataType = "illuminance" ORDER BY Date DESC LIMIT 1;', [roomId])
                    temperature = self.db.execute(
                        'SELECT Data FROM RoomData WHERE RoomId = ? AND DataType = "temperature" ORDER BY Date DESC LIMIT 1;', [roomId])
                    humidity = self.db.execute(
                        'SELECT Data FROM RoomData WHERE RoomId = ? AND DataType = "humidity" ORDER BY Date DESC LIMIT 1;', [roomId])
                    CO2 = self.db.execute(
                        'SELECT Data FROM RoomData WHERE RoomId = ? AND DataType = "CO2" ORDER BY Date DESC LIMIT 1;', [roomId])
                    motion = self.db.execute(
                        'SELECT Data FROM RoomData WHERE RoomId = ? AND DataType = "motion" ORDER BY Date DESC LIMIT 1;', [roomId])
                    try:
                        if light[0] is not None and temperature[0] is not None and humidity[0] is not None and CO2[0] is not None and motion[0] is not None:
                            # add light to data on roomId
                            data += [{'roomId': roomId, 'light': light[0], 'temperature': temperature[0],
                                      'humidity': humidity[0], 'CO2': CO2[0], 'motion': motion[0]}]
                    except Exception as e:
                        i += 1
                return data
        except Exception as e:
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

    def get_lights(self, type='all'):
        data = ''
        try:
            if type == 'all':
                data = self.db.execute('SELECT * FROM Light')
            elif type == 'unassigned':
                data = self.db.execute(
                    'SELECT * FROM Light WHERE RoomId = 0')
            else:
                data = self.db.execute(
                    'SELECT * FROM Light WHERE RoomId = ?', [type])
            return data
        except:
            return False

    def assing_light(self, roomId, lightId):
        try:
            print(roomId, lightId)
            self.db.execute(
                "UPDATE Light SET RoomId = ? WHERE Id = ?", [roomId, lightId])
            return self.get_lights('unassigned')
        except Exception as e:
            return False

    def reset(self):
        try:
            self.db.execute('UPDATE Light SET RoomId = 0')
            return self.get_lights('unassigned')
        except:
            return False
            
    def get_wattage(self):
        philps = PhilipsControl()
        return philps.get_wattage()
