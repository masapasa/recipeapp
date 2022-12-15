CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    pass VARCHAR(28) NOT NULL,
    hashedpass VARCHAR NOT NULL
);

INSERT INTO users (username, pass, hashedpass) VALUES ($1, $2, $3);