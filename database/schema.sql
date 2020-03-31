GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password';

DROP DATABASE IF EXISTS PopularDishesList;

CREATE DATABASE PopularDishesList;

USE PopularDishesList;

CREATE TABLE Restaurants (
    restaurant_id int NOT NULL
    AUTO_INCREMENT,
    restaurant_name varchar
    (50) NOT NULL,
    PRIMARY KEY
    (restaurant_id)
);

CREATE TABLE PopularDishes (
    dish_id int NOT NULL
    AUTO_INCREMENT,
    dish_name varchar (50) NOT NULL,
    price decimal (10, 2) NOT NULL,
    description varchar (1000) NOT NULL,
    review_count INT NOT NULL,
    restaurant int,
    PRIMARY KEY (dish_id),
    FOREIGN KEY (restaurant) REFERENCES Restaurants (restaurant_id)
);

CREATE TABLE photos (
    photo_id int NOT NULL AUTO_INCREMENT,
    url varchar (200) NOT NULL,
    caption varchar (1000) NOT NULL,
    popular_dish int,
    PRIMARY KEY (photo_id),
    FOREIGN KEY (popular_dish) REFERENCES PopularDishes (dish_id)
);


CREATE TABLE users (
    userid int NOT NULL AUTO_INCREMENT,
    userphoto VARCHAR (200),
    username VARCHAR (70) NOT NULL,
    friends int, 
    reviews int,
    PRIMARY KEY (userid),
    UNIQUE (username)
);

CREATE TABLE reviews (
    reviewid int NOT NULL AUTO_INCREMENT,
    userid int NOT NULL,
    date VARCHAR (100) NOT NULL,
    rating int NOT NULL,
    text VARCHAR (1000) NOT NULL,
    dish_id int NOT NULL,
    PRIMARY KEY (reviewid),
    FOREIGN KEY (userid) REFERENCES users (userid),
    FOREIGN KEY (dish_id) REFERENCES PopularDishes (dish_id)  
);


GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password';
