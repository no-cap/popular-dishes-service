const faker = require('faker');
const writeAllToJSON = require('./writeAllToJSON.js');

// UTILITIES
// min >= returnValue < max
const randomNum = (min, max) => Math.floor((Math.random() * (max - min) + min));

// write Restaurant, PopularDish, Review, User, and Photo records,
// group into sets of 100,000
const AllRestaurants = []; // need 10M
const AllPopularDishes = []; // need 4 per restaurant (40M)
const AllReviews = []; // need 1-2 per dish (40-80M)
const AllUsers = []; // need 1 per review (40-80M)
const AllPhotos = []; // need 1 per review (40-80M)

/* USERS */
// user profile images > https://sdc-users.s3-us-west-1.amazonaws.com/1.png
const createUsers = () => {
  for (let i = 0; i < 50; i += 1) {
    const set = [];
    for (let ii = 0; ii < 100000; ii += 1) {
      set.push({
        username: faker.name.firstName(),
        userPhoto: `https://sdc-users.s3-us-west-1.amazonaws.com/${randomNum(0, 71)}.png`,
      });
    }
    AllUsers.push(set);
  }
};

const createPhotos = () => {
  for (let i = 0; i < 50; i += 1) {
    const set = [];
    for (let ii = 0; ii < 100000; ii += 1) {
      set.push({
        caption: faker.lorem.words(),
        userPhoto: `https://sdc-food.s3-us-west-1.amazonaws.com/${randomNum(0, 738)}.jpg`,
      });
    }
    AllPhotos.push(set);
  }
};

const createRestaurants = () => {
  for (let i = 0; i < 20; i += 1) {
    const set = [];
    for (let ii = 0; ii < 100; ii += 1) {
      set.push({
        restaurantName: faker.company.companyName(),
        // popularDishes: [],
      });
    }
    AllRestaurants.push(set);
  }
};

createUsers();
writeAllToJSON(AllUsers, 'users');

// createPhotos();
// writeAllToJSON(AllPhotos, 'photos');

// createRestaurants();
// writeAllToJSON(AllRestaurants, 'restaurants');


// writeAllToJSON => expects an array of arrays of documents
// This creates an async forEach method which we will use to write records to a json file


// writeAllToJSON(AllPopularDishes, 'popularDishes');
// writeAllToJSON(AllReviews, 'reviews');
// import json files to database
