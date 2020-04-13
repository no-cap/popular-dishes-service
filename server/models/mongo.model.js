/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line object-curly-newline
const { Restaurant, Dish, Review, User } = require('../../database/dbseeding/mongoModels.js');


/*
  * POST ROUTES
*/

// /api/restaurants/:restaurantID/dishes
module.exports.postDish = (dish, callback) => {
  const newDish = new Dish(dish);
  newDish.save((err, result) => {
    if (err) {
      callback(err);
    } else {
      // eslint-disable-next-line max-len
      Restaurant.findByIdAndUpdate(result.restaurandId, { $push: { dishes: result._id } }, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    }
  });
};

// /api/restaurants/:restaurantID/dishes/:dishID/reviews
module.exports.postReview = (review, callback) => {
  const newReview = new Review(review);
  newReview.save((err, result) => {
    if (err) {
      callback(err);
    } else {
      Dish.findByIdAndUpdate(result.dishId, { $push: { reviews: result._id } }, (err, result) => {
        if (err) {
          callback(err);
        } else {
          Restaurant.findByIdAndUpdate(result.restaurandId, { $push: { dishes: result._id } }, (err, result) => {
            if (err) callback(err);
            else callback(null, result);
          });
        }
      });
    }
  });
};

/*
  * GET ROUTES
*/

// /api/restaurants/:restaurantID
// module.exports.getDishes = (restaurandId, callback) => {
//   Restaurant.findById(restaurandId).lean().populate({
//     path: 'dishes',
//     populate: {
//       path: 'reviews',
//       populate: 'userId',
//     },
//   }).exec((err, result) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, result);
//     }
//   });
// };

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

// /api/restaurants/:restaurantID/nearby
// module.exports.getNearby = (req, res) => {

// };

/*
  * PUT ROUTES
*/

// /api/restaurants/:restaurantID/dishes/:dishID
module.exports.putDish = (dish, callback) => {
  Dish.findByIdAndUpdate(dish._id, { price: dish.price }, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

// /api/restaurants/:restaurantID/dishes/:dishID/reviews/:reviewID
module.exports.putReview = (review, callback) => {
  Review.findByIdAndUpdate(review._id, { reviewText: review.reviewText }, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

/*
  * DELETE ROUTES
*/

// /api/restaurants/:restaurantID/dishes/:dishID
module.exports.deleteDish = ({ restaurandId, dishId }, callback) => {
  Restaurant.findByIdAndUpdate(restaurandId, { $pull: { dishes: dishId } }, (err) => {
    if (err) callback(err);
    Dish.findByIdAndDelete(dishId, (err, result) => {
      result.reviews.forEach((review) => {
        Review.findByIdAndDelete(review._id, (err, result) => {
          if (err) callback(err);
          // eslint-disable-next-line max-len
          User.findByIdAndUpdate(result.userId, { $pull: { reviews: result._id } }, (err, result) => {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
        });
      });
    });
  });
};

// /api/restaurants/:restaurantID/dishes/:dishID/reviews/:reviewID
module.exports.deleteReview = ({ dishId, reviewId }, callback) => {
  Dish.findByIdAndUpdate(dishId, { $pull: { reviews: reviewId } }, (err) => {
    if (err) callback(err);
    Review.findByIdAndDelete(reviewId, (err, result) => {
      if (err) callback(err);
      User.findByIdAndUpdate(result.userId, { $pull: { reviews: result._id } }, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    });
  });
};
