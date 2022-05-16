-- create user table
CREATE TABLE IF NOT EXISTS `users` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `email` TEXT,
    `password` TEXT
);
-- insert default user
INSERT INTO `users` (`email`, `password`)
VALUES (
        'root@localhost',
        '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
    );
-- delete all users
DELETE FROM `users`;
-- create active sessions table
CREATE TABLE IF NOT EXISTS `sessions` (
    `session_id` TEXT,
    `created` DATETIME,
    `expires` DATETIME
);
-- create rooms table
CREATE TABLE IF NOT EXISTS `rooms` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `name` TEXT,
    `building` TEXT
);
-- insert test data into rooms table
INSERT INTO `rooms` (`name`, `building`)
VALUES ('Room 1', 'Building 1');
INSERT INTO `rooms` (`name`, `building`)
VALUES ('Room 2', 'Building 1');
INSERT INTO `rooms` (`name`, `building`)
VALUES ('Room 3', 'Building 1');
INSERT INTO `rooms` (`name`, `building`)
VALUES ('Room 4', 'Building 3');
INSERT INTO `rooms` (`name`, `building`)
VALUES ('Room 5', 'Building 1');
INSERT INTO `rooms` (`name`, `building`)
VALUES ('Room 6', 'Building 2');
INSERT INTO `rooms` (`name`, `building`)
VALUES ('Room 7', 'Building 1');
INSERT INTO `rooms` (`name`, `building`)
VALUES ('Room 8', 'Building 3');
INSERT INTO `rooms` (`name`, `building`)
VALUES ('Room 9', 'Building 4');
INSERT INTO `rooms` (`name`, `building`)
VALUES ('Room 10', 'Building 2');