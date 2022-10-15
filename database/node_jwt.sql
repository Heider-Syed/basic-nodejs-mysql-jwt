CREATE DATABASE node_jwt;

USE node_jwt;

CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    
    PRIMARY KEY(id)
);

CREATE TABLE posts(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(id)
);

INSERT INTO posts (title,body,user_id) VALUES ("Titulo 1","Body del post 1",1);
INSERT INTO posts (title,body,user_id) VALUES ("Titulo 2","Body del post 2",1);

select * from users;
select * from posts;

SELECT u.id AS USERID, U.username , p.id AS POSTID, p.title, p.body, p.created
FROM users u
INNER JOIN posts p
ON p.user_id = u.id;