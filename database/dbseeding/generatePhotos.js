const faker = require('faker');
const writeAllToJSON = require('./writeAllToJSON.js');

// UTILITIES
// min >= returnValue < max
const randomNum = (min, max) => Math.floor((Math.random() * (max - min) + min));
const AllPhotos = []; // need 1 per review (40-80M)

const createPhotos = () => {
  for (let i = 0; i < 17; i += 1) {
    const set = [];
    for (let ii = 0; ii < 200000; ii += 1) {
      set.push({
        caption: faker.lorem.words(),
        userPhoto: `https://sdc-food.s3-us-west-1.amazonaws.com/${randomNum(0, 738)}.jpg`,
      });
    }
    AllPhotos.push(set);
  }
};
createPhotos();
writeAllToJSON(AllPhotos, 'photos');
