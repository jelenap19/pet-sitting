CREATE TABLE
    IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ad_id INT NOT NULL,
        owner_id INT NOT NULL,
        comment_text TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_comments_ad (ad_id),
        INDEX idx_comments_owner (owner_id),
        CONSTRAINT fk_comments_ad FOREIGN KEY (ad_id) REFERENCES ad (id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_comments_owner FOREIGN KEY (owner_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;