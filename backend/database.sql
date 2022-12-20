CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    pass VARCHAR(28) NOT NULL,
    hashedpass VARCHAR NOT NULL
);

CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(8000) NOT NULL,
    ingredients VARCHAR(8000) NOT NULL,
    steps VARCHAR(8000) NOT NULL,
    favorite BOOLEAN NOT NULL,
    rating INTEGER NOT NULL,
    user_id SERIAL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO users (username, pass, hashedpass) VALUES ($1, $2, $3);

ALTER TABLE recipes ALTER COLUMN steps TYPE VARCHAR(8000);