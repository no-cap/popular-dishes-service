CREATE TABLE "restaurants" (
  "restaurant_id" SERIAL PRIMARY KEY NOT NULL,
  "restaurant_name" VARCHAR(50) NOT NULL
);

CREATE TABLE "dishes" (
  "dish_id" SERIAL PRIMARY KEY NOT NULL,
  "dish_name" VARCHAR(50) NOT NULL,
  "price" DECIMAL(5,2) NOT NULL,
  "description" VARCHAR(1000) NOT NULL,
  "restaurant_id" INT
);

CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY NOT NULL,
  "userphoto" VARCHAR(200),
  "username" VARCHAR(70) NOT NULL
);

CREATE TABLE "reviews" (
  "review_id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" INT NOT NULL,
  "url" VARCHAR(200) NOT NULL,
  "caption" VARCHAR(1000) NOT NULL,
  "date_time" TIMESTAMP NOT NULL,
  "rating" INT NOT NULL,
  "review_text" VARCHAR(1000) NOT NULL,
  "dish_id" INT NOT NULL
);

ALTER TABLE "dishes" ADD FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("restaurant_id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("dish_id") REFERENCES "dishes" ("dish_id");
