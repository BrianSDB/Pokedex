CREATE DATABASE pokeapp;

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255),
    name VARCHAR(255)
    
);