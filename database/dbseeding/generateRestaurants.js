const faker = require('faker');
const writeAllToJSON = require('./writeAllToJSON.js');

// UTILITIES
// min >= returnValue < max
// const randomNum = (min, max) => Math.floor((Math.random() * (max - min) + min));

const AllRestaurants = []; // need 10M
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

createRestaurants();
writeAllToJSON(AllRestaurants, 'restaurants');
