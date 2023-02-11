CREATE TABLE user_order(
    id SERIAL PRIMARY KEY,
    order_status VARCHAR(50),
    u_id INT REFERENCES users(id) NOT Null,
    total_price INT NOT NULL
);

