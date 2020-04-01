require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const controller = require('./controller.js');

const app = express();
const companyNumber = 10; // this is how many companies there are;

app.listen(process.env.SERVER_PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on ${process.env.SERVER_PORT}`);
  }
});

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/dist/')));


app.get('/popularDishes/getCompany', (req, res) => {
  controller.getCompany(companyNumber, res);
});

app.get('/popularDishes/getItems', (req, res) => {
  controller.getDishes(req, res);
});

app.get('/popularDishes/getPhotos', (req, res) => {
  controller.getPhotos(req, res);
});

app.get('/popularDishes/getReviews', (req, res) => {
  controller.getReviews(req, res);
});

app.get('/popularDishes/arrow.png', (req, res) => {
  res.sendFile();
});

app.get('/popularDishes/leftarrow.png', (req, res) => {
  res.sendFile('/leftarrow.png');
});
