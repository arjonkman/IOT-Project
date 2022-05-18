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
    `Id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `Name` TEXT,
    `Building` TEXT,
    `Floor` INTEGER,
    `Number` INTEGER
);
CREATE TABLE IF NOT EXISTS `Light` (
    `Id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `RoomId` INTEGER,
    `Name` TEXT,
    `Data` INTEGER,
    `Date` DATE,
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
-- insert test data into rooms table
INSERT INTO Room (
        `Name`,
        `Building`,
        `Floor`,
        `Number`
    )
VALUES ('A111', 'ZP11', '1', '11');
INSERT INTO Room (
        `Name`,
        `Building`,
        `Floor`,
        `Number`
    )
VALUES ('A112', 'ZP11', '1', '12');
INSERT INTO Room (
        `Name`,
        `Building`,
        `Floor`,
        `Number`
    )
VALUES ('A113', 'ZP11', '3', '13');
INSERT INTO Room (
        `Name`,
        `Building`,
        `Floor`,
        `Number`
    )
VALUES ('A114', 'ZP11', '1', '14');
INSERT INTO Room (
        `Name`,
        `Building`,
        `Floor`,
        `Number`
    )
VALUES ('A115', 'ZP11', '1', '15');