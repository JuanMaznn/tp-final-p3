ALTER TABLE usuarios ADD COLUMN reset_token VARCHAR(255) NULL;
ALTER TABLE usuarios ADD COLUMN reset_token_expires DATETIME NULL;
CREATE INDEX idx_reset_token ON usuarios(reset_token);
