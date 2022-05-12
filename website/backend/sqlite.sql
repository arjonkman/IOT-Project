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