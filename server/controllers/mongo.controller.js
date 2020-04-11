/* eslint-disable no-console */
const Model = require('../models/mongo.model.js');


/*
  * POST ROUTES
*/

// /api/dishes
module.exports.postDish = (req, res) => {
  const newDish = req.body;
  Model.postDish(newDish, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};

// /api/reviews
module.exports.postReview = (req, res) => {
  const newReview = req.body;
  Model.postReview(newReview, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};

/*
  * GET ROUTES
*/

// /api/restaurants/:restaurantID
module.exports.getDishes = (restaurantId, res) => {
  Model.getDishes(restaurantId, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(results);
    }
  });
};

// /api/restaurants/:restaurantID/nearby
module.exports.getNearby = (req, res) => {
  const { restaurantId } = req.body;
  Model.getNearby(restaurantId, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(results);
    }
  });
};

/*
  * PUT ROUTES
*/

// /api/dishes/
module.exports.putDish = (req, res) => {
  const updatedDish = req.body;
  Model.putDish(updatedDish, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};

// /api/reviews
module.exports.putReview = (req, res) => {
  const updatedReview = req.body;
  Model.putReview(updatedReview, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};

/*
  * DELETE ROUTES
*/

// /api/dishes
module.exports.deleteDish = (req, res) => {
  const deletedDish = req.body;
  Model.deleteDish(deletedDish, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};

// /api/reviews
module.exports.deleteReview = (req, res) => {
  const deletedReview = req.body;
  Model.deleteReview(deletedReview, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};
