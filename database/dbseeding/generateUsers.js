const faker = require('faker');
const writeAllToJSON = require('./writeAllToJSON.js');

// UTILITIES
// min >= returnValue < max
const randomNum = (min, max) => Math.floor((Math.random() * (max - min) + min));

const AllUsers = []; // need 1 per review (40-80M)
/* USERS */
// user profile images > https://sdc-users.s3-us-west-1.amazonaws.com/1.png
const createUsers = () => {
  for (let i = 0; i < 17; i += 1) {
    const set = [];
    for (let ii = 0; ii < 200000; ii += 1) {
      set.push({
        username: faker.name.firstName(),
        userPhoto: `https://sdc-users.s3-us-west-1.amazonaws.com/${randomNum(0, 71)}.png`,
      });
    }
    AllUsers.push(set);
  }
};

createUsers();
writeAllToJSON(AllUsers, 'users');
