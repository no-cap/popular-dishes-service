/* eslint-disable no-underscore-dangle */
const faker = require('faker');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const cliProgress = require('cli-progress');
const { Dish, Restaurant, Review, User } = require('./mongoModels.js');


const randomNum = (min, max) => Math.floor((Math.random() * (max - min) + min));
const NumberOfRestaurants = process.argv[2] || 15000;
const DishesPerRestaurant = process.argv[3] || 4;
const ReviewsPerDish = process.argv[4] || 2;


const multibar = new cliProgress.MultiBar({
  format: '{bar} {percentage}% || {value}/{total} Chunks || {name}',
  clearOnComplete: false,
  hideCursor: true,
  stopOnComplete: true,
}, cliProgress.Presets.shades_grey);

const Total = multibar.create(NumberOfRestaurants * DishesPerRestaurant * (ReviewsPerDish * 2), 0, { name: 'Total ' });
const Restaurants = multibar.create(NumberOfRestaurants, 0, { name: 'Restaurants ' });
const Dishes = multibar.create(NumberOfRestaurants * DishesPerRestaurant, 0, { name: 'Dishes ' });
const Reviews = multibar.create(NumberOfRestaurants * DishesPerRestaurant * ReviewsPerDish, 0, { name: 'Reviews ' });
const Users = multibar.create(NumberOfRestaurants * DishesPerRestaurant * ReviewsPerDish, 0, { name: 'Users ' });

const adjective = ['Organic', 'Fresh', 'Family', 'Super', 'Giant', 'Summer', 'Winter', 'Spring', 'BigOl', 'Tasty', 'Juicy', 'Vegan', 'Big', 'Delicious'];
const cuisine = ['Italian', 'Thai', 'Indian', 'Vietnamese', 'Bulgarian', 'Chinese', 'Mexican', 'Russian', 'Slavic', 'European', 'French', 'Japanese', 'Korean', 'German', 'British'];
const foodSingular = ['Burger', 'Sushi', 'Pizza', 'Summer Salad', 'Casserole', 'Chili Bowl', 'Soup', 'Pie', 'Cake', 'Burrito', 'Taco', 'Salad', 'Pho', 'Chili', 'Momo', 'StirFry', 'FishNChips', 'MacNCheese', 'Pasta', 'Spaghetti'];
const prefixes = [adjective, cuisine];
const prefixSet = prefixes[randomNum(0, 2)]; // gives each record a random prefix set

const genIDs = (num) => {
  const IDs = [];
  for (let i = 0; i < num; i += 1) {
    IDs.push(new mongoose.Types.ObjectId());
  }
  return IDs;
};

const someRestaurants = () => {
  const restaurants = [];
  for (let i = 0; i < NumberOfRestaurants; i += 1) {
    restaurants.push(new Restaurant({
      _id: new mongoose.Types.ObjectId(),
      restaurantName: faker.company.companyName(),
      popularDishes: genIDs(DishesPerRestaurant),
    }));
  }
  return restaurants;
};

const someDishes = (restaurant) => {
  const dishes = [];
  for (let i = 0; i < DishesPerRestaurant; i += 1) {
    dishes.push(new Dish({
      _id: restaurant.popularDishes[i],
      dishName: `${prefixSet[randomNum(0, prefixSet.length)]} ${foodSingular[randomNum(0, foodSingular.length)]}`,
      price: `${randomNum(6, 25)}.${randomNum(80, 100)}`,
      description: `${faker.lorem.words()} ${faker.lorem.words()}`,
      restaurantId: restaurant._id,
      reviews: genIDs(ReviewsPerDish),
    }));
  }
  return dishes;
};

const someReviews = (dish) => {
  const reviews = [];
  for (let i = 0; i < dish.reviews.length; i += 1) {
    reviews.push(new Review({
      _id: dish.reviews[i]._id,
      dishId: dish._id,
      userId: genIDs(1)[0],
      photoUrl: `https://sdc-food.s3-us-west-1.amazonaws.com/${randomNum(0, 738)}.jpg`,
      caption: faker.lorem.words(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      rating: randomNum(1, 6),
      reviewText: faker.lorem.sentences(),
    }));
  }
  return reviews;
};

const someUser = (review) => {
  const users = [];
  users.push(new User({
    _id: review.userId,
    username: faker.name.firstName(),
    userPhoto: `https://sdc-users.s3-us-west-1.amazonaws.com/${randomNum(0, 71)}.png`,
    reviews: [review._id],
  }));
  return users;
};

const generateSet = () => {
  const restaurants = someRestaurants();
  restaurants.forEach((restaurant) => {
    restaurant.save((err) => {
      if (err) console.error(err);
      Total.increment();
      Restaurants.increment();

      const dishes = someDishes(restaurant);
      dishes.forEach((dish) => {
        dish.save((err) => {
          if (err) console.error(err);
          Total.increment();
          Dishes.increment();

          const reviews = someReviews(dish);
          reviews.forEach((review) => {
            review.save((err) => {
              if (err) console.error(err);
              Total.increment();
              Reviews.increment();

              const users = someUser(review);
              users.forEach((user) => {
                user.save((err) => {
                  if (err) console.error(err);
                  Total.increment();
                  Users.increment();
                });
              });
            });
          });
        });
      });
    });
  });
};

generateSet();