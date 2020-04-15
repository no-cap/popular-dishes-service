/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

// Connection URL and database Name from .env
const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_DB } = process.env;
const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Create and export MongoDB connection
module.exports = mongoose.createConnection(uri, options, (err) => {
  if (err) {
    console.log(`Failed to connect to ${MONGO_HOST}: \n${err}`);
  } else {
    console.log(`Successfully connected to mongodb://${MONGO_HOST}`);
  }
});
