require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const model = require('./model.js');

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
  model.getCompany(companyNumber, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/popularDishes/getItems', (req, res) => {
  const { restaurantId } = req.query;
  model.getDishes(restaurantId, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/popularDishes/getPhotos', (req, res) => {
  const { dishId } = req.query;
  model.getPhotos(dishId, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/popularDishes/getReviews', (req, res) => {
  const { numberOfReviews } = req.query;
  model.getReviews(numberOfReviews, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/popularDishes/arrow.png', (req, res) => {
  res.sendFile('/arrow.png');
});

app.get('/popularDishes/leftarrow.png', (req, res) => {
  res.sendFile('/leftarrow.png');
});
