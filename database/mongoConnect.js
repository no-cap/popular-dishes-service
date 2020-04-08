/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

// Connection URL and database Name from .env
const uri = `${process.env.MONGO_HOST}/${process.env.MONGO_DB}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Create and export MongoDB connection
module.exports = mongoose.createConnection(uri, options, (err) => {
  if (err) {
    console.log(`Failed to connect to ${uri}: \n${err}`);
  } else {
    console.log(`Successfully connected to ${uri}`);
  }
});
