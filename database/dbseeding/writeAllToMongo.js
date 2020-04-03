const db = require('../mongoConnect.js');
const writeAllToJSON = require('./writeAllToJSON.js');
const { Restaurant, PopularDish, Review, User, Photo } = require('./mongoModels.js');

// write Restaurant, PopularDish, Review, User, and Photo records

// writeAllToJSON

// write to Mongo

db.close(false, (err) => {
  if (err) {
    console.log(`Failed to disconnect from mongodb://${db.host}:${db.port}/${db.name}`);
  } else {
    console.log(`Successfully disconnected from mongodb://${db.host}:${db.port}/${db.name}`);
  }
});
