/* eslint-disable no-console */
const faker = require('faker');
const Promise = require('bluebird');
const writeAllToJSON = require('./writeAllToJSON.js');
const { Restaurant } = require('./mongoModels.js');

// UTILITY
// min >= returnValue < max
const randomNum = (min, max) => Math.floor((Math.random() * (max - min) + min));

const getDishes = (noFiles, noRecords) => {
  const adjective = ['Organic', 'Fresh', 'Family', 'Super', 'Giant', 'Summer', 'Winter', 'Spring', 'BigOl', 'Tasty', 'Juicy', 'Vegan', 'Big', 'Delicious'];
  const cuisine = ['Italian', 'Thai', 'Indian', 'Vietnamese', 'Bulgarian', 'Chinese', 'Mexican', 'Russian', 'Slavic', 'European', 'French', 'Japanese', 'Korean', 'German', 'British'];
  const foodSingular = ['Burger', 'Sushi', 'Pizza', 'Summer Salad', 'Casserole', 'Chili Bowl', 'Soup', 'Pie', 'Cake', 'Burrito', 'Taco', 'Salad', 'Pho', 'Chili', 'Momo', 'StirFry', 'FishNChips', 'MacNCheese', 'Pasta', 'Spaghetti'];
  const prefixes = [adjective, cuisine];
  const AllDishes = [];
  // Count documents in collection, will help us pick random records from the whole collection
  Restaurant.countDocuments()
    .then((count) => {
      const records = [];
      for (let i = 0; i < (noFiles * noRecords); i += 1) {
        records.push(Restaurant.findOne().select('_id').skip(randomNum(0, count)));
      }
      return Promise.all(records);
    })
    .then((records) => {
      console.log(`${records.length} records retrieved from database`);
      for (let i = 0; i < noFiles; i += 1) {
        const set = [];
        for (let ii = 0; ii < noRecords; ii += 1) {
          const prefixSet = prefixes[randomNum(0, 2)]; // gives each record a random prefix set
          set.push({
            dishName: `${prefixSet[randomNum(0, prefixSet.length)]} ${foodSingular[randomNum(0, foodSingular.length)]}`,
            price: `${randomNum(6, 25)}.${randomNum(80, 100)}`,
            description: `${faker.lorem.words()} ${faker.lorem.words()}`,
            // eslint-disable-next-line no-underscore-dangle
            restaurantId: records[(i * noRecords + ii)]._id,
          });
        }
        console.log('Pushing new set into master set...');
        AllDishes.push(set);
      }
    })
    .then(() => {
      console.log('Writing JSON...');
      writeAllToJSON(AllDishes, 'dishes');
    })
    .catch((err) => {
      console.error(err);
    });
};

getDishes(process.argv[2], process.argv[3]);
