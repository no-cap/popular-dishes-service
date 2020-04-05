/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const db = require('../mongoConnect.js');

const collection = process.argv[2];
const DIR = path.resolve(`../JSON_Data/${collection}/`);

let totalInserted = 0;
let documentCount = 0;
db.once('open', () => {
  fs.readdirSync(DIR).forEach((file, i) => {
    fs.readFile(`${DIR}/${file}`, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        db.collection(collection).insertMany(JSON.parse(data), (err, res) => {
          documentCount += 1;
          if (err) {
            console.error(`Error uploading json (${i}) to the ${collection} collection: ${err}`);
          }
          totalInserted += res.insertedCount;
          console.log(`Successfully inserted ${res.insertedCount} records from file (${i}) to the ${collection} collection`);
          fs.unlink(path.join(DIR, `${collection}${i}.json`), (err) => {
            if (err) {
              console.error(err);
            }
            if (documentCount === 16) {
              db.close(false, (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log(`Successfully disconnected from the database after inserting ${totalInserted} records to ${collection}`);
                }
              });
            }
          });
        });
      }
    });
  });
});
