const db = require('../mongoConnect.js');
const fs = require('fs');

const { Restaurant, PopularDish, Review, User, Photo } = require('./mongoModels.js');

db.close(false, (err) => {
  if (err) {
    console.log(`Failed to disconnect from mongodb://${db.host}:${db.port}/${db.name}`);
  } else {
    console.log(`Successfully disconnected from mongodb://${db.host}:${db.port}/${db.name}`);
  }
});
