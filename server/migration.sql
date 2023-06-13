DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL,
  user_email VARCHAR(200),
  clothes_id SERIAL,
  title TEXT,
  price DECIMAL,
  category TEXT,
  description TEXT,
  image VARCHAR(200)
);

INSERT INTO users(user_email) VALUES('seb');


