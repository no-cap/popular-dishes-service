/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line object-curly-newline
const { Restaurant, User } = require('../../database/dbseeding/mongoSchema.js');


/*
  * POST ROUTES
*/

// /api/restaurants
module.exports.postRestaurant = (restaurant, callback) => {
  const newRestaurant = new Restaurant(restaurant);
  newRestaurant.save((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

// /api/restaurants/:restaurantId/dishes
module.exports.postDish = (dish, restaurandId, callback) => {
  Restaurant.findById(restaurandId, (err, result) => {
    result.dishes.push(dish);
    result.save((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  });
};

// /api/restaurants/:restaurantId/:dishId/reviews
module.exports.postReview = (review, restaurandId, dishId, callback) => {
  Restaurant.findById(restaurandId, (err, result) => {
    result.dishes.id(dishId).reviews.push(review);
    result.save((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  });
};

/*
  * GET ROUTES
*/

// /api/restaurants/:restaurantId
module.exports.getRestaurant = (restaurandId, callback) => {
  Restaurant.findById(restaurandId, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  }).lean();
};

// /api/users/:userId
module.exports.getUser = (userId, callback) => {
  User.findById(userId, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  }).lean();
};

// /api/restaurants/:restaurantId/nearby
// module.exports.getNearby = (req, res) => {

// };

/*
  * PUT ROUTES
*/

// /api/restaurants/:restaurantId/:dishId
module.exports.putDish = (dish, callback) => {

};

// /api/restaurants/:restaurantId/:dishId/:reviewId
module.exports.putReview = (review, callback) => {

};

/*
  * DELETE ROUTES
*/

// /api/restaurants/:restaurantId/:dishId
module.exports.deleteDish = ({ restaurandId, dishId }, callback) => {

};

// /api/restaurants/:restaurantId/:dishId/:reviewId
module.exports.deleteReview = ({ dishId, reviewId }, callback) => {

};
