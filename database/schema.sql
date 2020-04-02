DROP DATABASE IF EXISTS populardishes_db;

CREATE DATABASE populardishes_db;

USE populardishes_db;

CREATE TABLE restaurants (
    restaurant_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    restaurant_name VARCHAR (50) NOT NULL
);

CREATE TABLE popular_dishes (
    dish_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dish_name VARCHAR (50) NOT NULL,
    price decimal (10, 2) NOT NULL,
    description VARCHAR (1000) NOT NULL,
    review_count INT NOT NULL,
    restaurant INT,
    FOREIGN KEY (restaurant) REFERENCES restaurants (restaurant_id)
);

CREATE TABLE photos (
    photo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR (200) NOT NULL,
    caption VARCHAR (1000) NOT NULL,
    popular_dish INT,
    FOREIGN KEY (popular_dish) REFERENCES popular_dishes (dish_id)
);


CREATE TABLE users (
    userid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userphoto VARCHAR (200),
    username VARCHAR (70) NOT NULL UNIQUE,
    friends INT, 
    reviews INT
);

CREATE TABLE reviews (
    reviewid int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userid int NOT NULL,
    date VARCHAR (100) NOT NULL,
    rating int NOT NULL,
    text VARCHAR (1000) NOT NULL,
    dish_id int NOT NULL,
    FOREIGN KEY (userid) REFERENCES users (userid),
    FOREIGN KEY (dish_id) REFERENCES popular_dishes (dish_id)  
);
