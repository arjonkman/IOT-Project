-- User
CREATE TABLE IF NOT EXISTS `User` (
    `Id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `Email` TEXT,
    `Password` TEXT
);
-- Session
CREATE TABLE IF NOT EXISTS `Session` (
    `SessionId` TEXT PRIMARY KEY,
    `UserId` INTEGER,
    `Created` DATETIME,
    `Expires` DATETIME,
    FOREIGN KEY(`UserId`) REFERENCES `User`(`Id`)
);
-- Room
CREATE TABLE IF NOT EXISTS `Room` (
    `Id` TEXT PRIMARY KEY NOT NULL,
    `Name` TEXT,
    `Building` TEXT,
    `Floor` INTEGER,
    `Number` INTEGER
);
CREATE TABLE IF NOT EXISTS `RoomData` (
    `Id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `RoomId` INTEGER,
    `DataType` TEXT,
    `Data` INTEGER,
    `Date` DATETIME,
    UNIQUE(RoomId, DataType, Date),
    FOREIGN KEY(`RoomId`) REFERENCES `Room`(`Id`)
);
-- insert default user
INSERT INTO `User` (`email`, `password`)
VALUES (
        'root@localhost',
        '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
    );
-- insert default session
INSERT INTO `Session` (`SessionId`, `UserId`, `Created`, `Expires`)
VALUES (
        '71eb61a338cddd99c89f7b4305441604d853f3fc',
        1,
        '2103-06-15 00:00:00',
        3600
    );
-- insert test data into rooms using ("A81758FFFE053FD7", "A81758FFFE053FDA", "A81758FFFE053FDB", "A81758FFFE053FDC") as room ids
INSERT INTO `Room` (`Id`, `Name`, `Building`, `Floor`, `Number`)
VALUES (
        'A81758FFFE053FD7',
        'Room 1',
        'Building 1',
        1,
        1
    ),
    (
        'A81758FFFE053FDA',
        'Room 2',
        'Building 1',
        1,
        2
    ),
    (
        'A81758FFFE053FDB',
        'Room 3',
        'Building 1',
        1,
        3
    ),
    (
        'A81758FFFE053FDC',
        'Room 4',
        'Building 1',
        1,
        4
    );
-- create lights table
CREATE TABLE IF NOT EXISTS `Light` (
    `Id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `RoomId` TEXT,
    `Name` TEXT,
    FOREIGN KEY(`RoomId`) REFERENCES `Room`(`Id`)
);
-- create light data table
CREATE TABLE IF NOT EXISTS `LightData` (
    `Id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `LightId` INTEGER,
    `Data` INTEGER,
    `Date` DATETIME,
    UNIQUE(LightId, Date),
    FOREIGN KEY(`LightId`) REFERENCES `Light`(`Id`)
);