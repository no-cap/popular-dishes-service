const mongoose = require('mongoose');
const db = require('../mongoConnect.js');

const { Schema } = mongoose;

const restaurantsSchema = new Schema({
  restaurantName: { type: String, required: true },
  popularDishes: [{
    type: Schema.Types.ObjectId,
    ref: 'popularDishes',
  }],
});

const dishesSchema = new Schema({
  dishName: { type: String, required: true },
  price: Number,
  description: String,
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'restaurants',
    required: true,
  },
  reviews: [{
    reviewId: {
      type: Schema.Types.ObjectId,
      ref: 'reviews',
    },
  }],
});

const reviewsSchema = new Schema({
  dishId: {
    type: Schema.Types.ObjectId,
    ref: 'popularDishes',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  photoUrl: { type: String, required: true },
  caption: String,
  dateTime: { type: Date, required: true },
  rating: { type: Number, required: true },
  reviewText: String,
});

// const photosSchema = new Schema({
//   url: { type: String, required: true },
//   caption: String,
// });

const usersSchema = new Schema({
  username: String,
  userPhoto: String,
});


module.exports.Restaurant = db.model('restaurants', restaurantsSchema);
module.exports.Dish = db.model('dishes', dishesSchema);
module.exports.Review = db.model('reviews', reviewsSchema);
module.exports.User = db.model('users', usersSchema);
// module.exports.Photo = model('photos', photosSchema);
