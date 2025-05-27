CREATE TABLE
    IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type ENUM ('ADMIN', 'REGISTERED') NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

INSERT IGNORE INTO roles (id, type)
VALUES
    (1, 'ADMIN'),
    (2, 'REGISTERED');