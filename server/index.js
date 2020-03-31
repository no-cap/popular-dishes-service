require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const companyNumber = 10; // this is how many companies there are;
const controller = require('./controller.js');

app.listen(process.env.SERVER_PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server is running on', + process.env.SERVER_PORT)
  }
});

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/dist/')))


app.get('/popularDishes/getCompany', (req, res) => {
  // var companyId = Math.floor(Math.random() * companyNumber) + 1;
  controller.getCompany(companyNumber, res);
});

app.get('/popularDishes/getItems', (req, res) => {
  controller.getDishes(req, res);
});

app.get('/popularDishes/getPhotos', (req, res) => {
  console.log(req.query);
  controller.getPhotos(req, res);
});

app.get('/popularDishes/arrow.png', (req, res) => {
  res.sendFile();
});

app.get('/popularDishes/leftarrow.png', (req, res) => {
  res.sendFile('https://photosthree.s3-us-west-1.amazonaws.com/leftarrow.png');
});

app.get('/popularDishes/getReviews', (req, res) => {
  controller.getReviews(req, res);
});
