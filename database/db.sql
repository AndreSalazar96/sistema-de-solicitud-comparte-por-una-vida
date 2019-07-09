CREATE DATABASE comparte_por_una_vida;

USE DATABASE comparte_por_una_vida;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password INT(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY(id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT = 2;

DESCRIBE users; 

--LINKS TABLE
CREATE TABLE links(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) references users(id)
);

ALTER TABLE links 
    ADD CONSTRAINT pk_links_id PRIMARY KEY(id);

ALTER TABLE links 
    MODIFY id  INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;