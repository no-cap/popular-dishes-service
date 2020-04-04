/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const db = require('../mongoConnect.js');

const collection1 = 'users';
const DIR1 = path.resolve(`/home/rory/repos/JSON_Data/${collection1}/`);
const collection2 = 'photos';
const DIR2 = path.resolve(`/home/rory/repos/JSON_Data/${collection2}/`);

db.once('open', () => {
  console.log('READY STATE: ', db.readyState);
  fs.readdirSync(DIR1).forEach((file, i) => {
    fs.readFile(`${DIR1}/${file}`, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        db.collection(collection1).insertMany(JSON.parse(data), (err, res) => {
          if (err) {
            console.error(`Error uploading json (${i}) to the ${collection1} collection: ${err}`);
          } else {
            console.log(`Successfully inserted ${res.insertedCount} records from file (${i}) to the ${collection1} collection`);
          }
        });
      }
    });
  });
  // fs.readdirSync(DIR2).forEach((file, i) => {
  //   fs.readFile(`${DIR2}/${file}`, (err, data) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       db.collection(collection2).insertMany(JSON.parse(data), (err, res) => {
  //         if (err) {
  //           console.error(`Error uploading json (${i}) to the ${collection2} collection: ${err}`);
  //         } else {
  //           console.log(`Successfully inserted ${res.insertedCount} records from file (${i}) to the ${collection2} collection`);
  //         }
  //       });
  //     }
  //   });
  // });
});
