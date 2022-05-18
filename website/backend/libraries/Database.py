import sqlite3


class Database:
    def __init__(self, filelocation):
        self.filelocation = filelocation

    def execute(self, sql, parameters=None):
        with sqlite3.connect(self.filelocation) as db:
            res = None
            if parameters == None:
                res = db.execute(sql)
            else:
                res = db.execute(sql, parameters)
            return res.fetchall()
