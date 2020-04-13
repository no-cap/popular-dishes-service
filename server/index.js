require('dotenv').config();
require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Controller = require('./controllers/mongo.controller.js');

const app = express();

app.listen(process.env.SERVER_PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on ${process.env.SERVER_PORT}`);
  }
});

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client/dist/')));

/*
  * POST ROUTES
*/

app.post('/api/dishes', (req, res) => {
  Controller.postDish(req, res);
});

app.post('/api/reviews', (req, res) => {
  Controller.postReview(req, res);
});

/*
  * GET ROUTES
*/

app.get('/api/restaurants/:restaurantId', (req, res) => {
  Controller.getRestaurant(req.params.restaurantId, res);
});

app.get('/api/users/:userId', (req, res) => {
  Controller.getUser(req.params.userId, res);
});

app.get('/api/restaurants/:restaurantId/nearby', (req, res) => {
  Controller.getNearby(req.params.restaurantId, res);
});

app.get('/popularDishes/arrow.png', (req, res) => {
  res.sendFile(path.join(__dirname, '/assets/arrow.png'));
});

app.get('/popularDishes/leftarrow.png', (req, res) => {
  res.sendFile(path.join(__dirname, '/assets/leftarrow.png'));
});


/*
  * PUT ROUTES
*/

app.put('/api/dishes', (req, res) => {
  Controller.putDish(req, res);
});

app.put('/api/reviews', (req, res) => {
  Controller.putReview(req, res);
});

/*
  * DELETE ROUTES
*/

app.delete('/api/dishes', (req, res) => {
  Controller.deleteDish(req, res);
});

app.delete('/api/reviews', (req, res) => {
  Controller.deleteReview(req, res);
});
