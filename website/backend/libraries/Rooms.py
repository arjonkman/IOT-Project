class Rooms():
    def __init__(self, db):
        self.db = db

    def create_room(self, name, building):
        self.db.execute(
            "INSERT INTO Room (Name, Building) VALUES (?, ?)", [name, building])

    def get_rooms(self, room):
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

    def light_intensity(self, roomId):
        try:
            data = self.db.execute(
                "SELECT Data FROM Light WHERE RoomId = ? ORDER BY Date", [roomId])
            return data
        except Exception as e:
            return e
