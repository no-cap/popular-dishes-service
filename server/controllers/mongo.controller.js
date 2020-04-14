/* eslint-disable no-console */
const Model = require('../models/mongo.model.js');


/*
  * POST ROUTES
*/

module.exports.postRestaurant = (req, res) => {
  const newRestaurant = req.body;
  Model.postRestaurant(newRestaurant, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};

// /api/restaurants/:restaurantId/dishes
module.exports.postDish = (req, res) => {
  const newDish = req.body;
  Model.postDish(newDish, req.params.restaurantId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};

// /api/restaurants/:restaurantId/:dishID/reviews
module.exports.postReview = (req, res) => {
  const newReview = req.body;
  const { restaurantId, dishId } = req.params;
  Model.postReview(newReview, restaurantId, dishId, (err, result) => {
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

// /api/restaurants/:restaurantId
module.exports.getRestaurant = (req, res) => {
  Model.getRestaurant(req.params.restaurantId, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(results);
    }
  });
};

// /api/users/:userId
module.exports.getUser = (req, res) => {
  Model.getUser(req.params.userId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};

// /api/restaurants/:restaurantId/nearby
module.exports.getNearby = (req, res) => {
  const { restaurantId } = req.params;
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

// /api/restaurants/:restaurantId/:dishId/dishes
module.exports.putDish = (req, res) => {
  const updatedDish = req.body;
  const { restaurantId, dishId } = req.params;
  Model.putDish(updatedDish, restaurantId, dishId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};

// /api/restaurants/:restaurantId/:dishId/:reviewId/reviews
module.exports.putReview = (req, res) => {
  const updatedReview = req.body;
  const { restaurantId, dishId, reviewId } = req.params;
  Model.putReview(updatedReview, restaurantId, dishId, reviewId, (err, result) => {
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

// /api/restaurants/:restaurantId/:dishId
module.exports.deleteDish = (req, res) => {
  const { restaurantId, dishId } = req.params;
  Model.deleteDish(restaurantId, dishId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};

// /api/restaurants/:restaurantId/:dishId/:reviewId
module.exports.deleteReview = (req, res) => {
  const { restaurantId, dishId, reviewId } = req.params;
  Model.deleteReview(restaurantId, dishId, reviewId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};
