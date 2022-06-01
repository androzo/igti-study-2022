CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    cpf VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    address VARCHAR NOT NULL
);

CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    cnpj VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    address VARCHAR NOT NULL
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    supplier_id INT NOT NULL,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    value NUMERIC NOT NULL,
    stock INT NOT NULL,
    CONSTRAINT fk_suppliers FOREIGN KEY (supplier_id) REFERENCES suppliers (supplier_id)
);

CREATE TABLE sales (
    sale_id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    product_id INT NOT NULL,
    value NUMERIC NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_clients FOREIGN KEY (client_id) REFERENCES clients (client_id),
    CONSTRAINT fk_products FOREIGN KEY (product_id) REFERENCES products (product_id)
)





