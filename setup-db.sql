-- Run these commands in MySQL Workbench or mysql CLI to set up the database:
-- Open terminal and type: mysql -u root -p
-- Then paste these commands:

CREATE DATABASE IF NOT EXISTS yasir_portfolio;

-- If your root user has NO password (most common on Windows dev installs):
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
FLUSH PRIVILEGES;

-- OR: Create a dedicated user with password 'yasir123'
-- CREATE USER IF NOT EXISTS 'yasir'@'localhost' IDENTIFIED BY 'yasir123';
-- GRANT ALL PRIVILEGES ON yasir_portfolio.* TO 'yasir'@'localhost';
-- FLUSH PRIVILEGES;

SELECT 'Database setup complete!' AS Status;
