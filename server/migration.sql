DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(200)
);
INSERT INTO users(user_email) VALUES('seb');
INSERT INTO users(user_email) VALUES('test');
INSERT INTO users(user_email) VALUES('steseb');
DROP TABLE IF EXISTS liked_items;

CREATE TABLE liked_items(
  clothes_id SERIAL,
  title TEXT,
  price DECIMAL,
  category TEXT,
  description TEXT,
  image VARCHAR(200),
  user_id SERIAL REFERENCES users(user_id)
);



