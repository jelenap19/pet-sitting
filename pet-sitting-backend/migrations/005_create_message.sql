CREATE TABLE
    IF NOT EXISTS message (
        id INT AUTO_INCREMENT PRIMARY KEY,
        from_id INT NOT NULL,
        to_id INT NOT NULL,
        message_text TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_message_from (from_id),
        INDEX idx_message_to (to_id),
        CONSTRAINT fk_message_from FOREIGN KEY (from_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_message_to FOREIGN KEY (to_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;