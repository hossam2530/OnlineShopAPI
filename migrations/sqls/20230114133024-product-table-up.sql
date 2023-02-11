CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(250) NOT NULL,
    product_price NUMERIC(6, 2) NOT NULL,
    product_category VARCHAR(50)
);