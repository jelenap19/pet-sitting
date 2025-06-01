CREATE TABLE
    IF NOT EXISTS ad (
        id INT AUTO_INCREMENT PRIMARY KEY,
        owner_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        description TEXT NOT NULL,
        image_url VARCHAR(255) NULL,
        tags  SET(
                 'dog','cat','fish','bird','reptile','other',
                 'weekend','week','month'
               ) NOT NULL DEFAULT ,,
        INDEX idx_ad_owner (owner_id),
        CONSTRAINT fk_ad_owner FOREIGN KEY (owner_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;