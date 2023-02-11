CREATE TABLE order_product(
    id SERIAL PRIMARY KEY,
    o_id INT REFERENCES user_order(id) NOT NULL,
    p_id INT REFERENCES product(id) NOT NULL,
    quantity INT NOT NULL,
    total_price INT NOT NULL
);