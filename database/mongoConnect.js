/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

// Connection URL and database Name from .env
const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST1, MONGO_HOST2, MONGO_HOST3, MONGO_DB } = process.env;
const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST1},${MONGO_HOST2},${MONGO_HOST3}/${MONGO_DB}?replicaSet=rs0&readPreference=secondaryPreferred`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Create and export MongoDB connection
module.exports = mongoose.createConnection(uri, options, (err) => {
  if (err) {
    console.log(`Failed to connect to ${MONGO_DB}: \n${err.stack}`);
  } else {
    console.log(`Successfully connected to ${MONGO_DB} as ${MONGO_USER}`);
  }
});
