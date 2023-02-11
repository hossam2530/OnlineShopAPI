CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    user_name varchar(20) NOT NULL,
    password varchar(255) NOT NULL
);
