from hashlib import sha1
from datetime import datetime, timedelta
import os


class Sessions:
    def __init__(self, database):
        self.database = database

    def create_session(self, user_id):
        session_id = sha1(os.urandom(128)).hexdigest()
        datetime_now = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
        self.database.execute(
            "INSERT INTO Session (SessionId, UserId, Created, Expires) VALUES (?, ?, ?, ?)", [session_id, user_id, datetime_now, 3600])
        return {'status': 'OK', 'session_id': session_id}

    def check_session(self, session_id):
        try:
            session = self.database.execute(
                "SELECT * FROM Session WHERE SessionId = ?", [session_id])[0]
        except IndexError:
            return False
        datetime_session = datetime.strptime(session[2], "%d-%m-%Y %H:%M:%S")
        datetime_now = datetime.now()
        expiration = session[3]
        if datetime_session + timedelta(seconds=expiration) < datetime_now:
            return False
        return True

    def update_sessions(self, session_id):
        data = self.database.execute(
            "SELECT * FROM Session WHERE SessionId = ?", [session_id])
        if not data:
            return False
        datetime_now = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
        self.database.execute("UPDATE Session SET Created = ? WHERE SessionId = ?", [
                              datetime_now, session_id])
        return True

    def delete_session(self, session_id):
        try:
            self.database.execute(
                "DELETE FROM Session WHERE SessionId = ?", [session_id])
            return True
        except Exception:
            return False


if __name__ == "__main__":
    from Database import Database
    db = Database("../database.db")
    sessions = Sessions(db)
    print(sessions.check_session(
        "6856cdccea9e45d85ee1faa903f98b2f61f02498"))
