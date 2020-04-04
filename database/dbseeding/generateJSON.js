const faker = require(faker);
const db = require('../mongoConnect.js');
const writeAllToJSON = require('./writeAllToJSON.js');
const { Restaurant, PopularDish, Review, User, Photo } = require('./mongoModels.js');

// UTILITIES
// min >= returnValue < max
const randomNum = (min, max) => {
  return Math.random() * (max - min) + min;
}

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
  for (let i = 0; i < 20; i += 1) {
    let set = [];
    for (let ii = 0; ii < 100; ii += 1) {
      set.push({
        username: fakeName,
        userPhoto: `https://sdc-users.s3-us-west-1.amazonaws.com/${randomNum(0, 71)}.png`,
      });
    }
    AllUsers.push(set);
  }
};

// writeAllToJSON => expects an array of arrays of documents
// This creates an async forEach method which we will use to write records to a json file
async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[i], i, array);
  }
}
asyncForEach(AllRecords, writeAllToJSON);
// import json files to database

db.close(false, (err) => {
  if (err) {
    console.log(`Failed to disconnect from mongodb://${db.host}:${db.port}/${db.name}`);
  } else {
    console.log(`Successfully disconnected from mongodb://${db.host}:${db.port}/${db.name}`);
  }
});
