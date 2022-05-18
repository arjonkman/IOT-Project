class Account:
    def __init__(self, db):
        self.db = db

    def create_user(self, email, password):
        try:
            self.db.execute("INSERT INTO User (Email, Password) VALUES (?, ?)", [
                            email, password])
        except Exception:
            return False
        return True

    def get_user(self, id=None, email=None):
        return self.db.execute(
            "SELECT Id, Email FROM User WHERE Id = ? OR Email = ?", [id, email])[0]

    def get_users(self):
        return self.db.execute("SELECT Id, Email FROM User")

    # TODO: Find a way to update certain fields of the row, instead of the whole row

    def delete_user(self, id=None, email=None):
        try:
            self.db.execute(
                "DELETE FROM User WHERE Id = ? OR Email = ?", [id, email])
        except Exception:
            return False
        return True

    # All Login/Register features

    def login(self, parameters):
        email = parameters.get('email')
        password = parameters.get('password')
        try:
            data = self.db.execute(
                "SELECT * FROM User WHERE Email = ? AND Password = ?", [email, password])
            if data != []:
                return data[0]
        except Exception:
            return []
        return []
