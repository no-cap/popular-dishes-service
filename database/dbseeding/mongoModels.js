const { Schema } = require('mongoose');
const db = require('../mongoConnect.js');

// const restaurantsSchema = new Schema({
//   restaurantName: { type: String, required: true },
//   dishes: [{
//     type: Schema.Types.ObjectId,
//     ref: 'dishes',
//   }],
// });

const restaurantsSchema = new Schema({
  restaurantName: { type: String, required: true },
  dishes: [{
    dishName: { type: String, required: true },
    price: Number,
    description: String,
    reviews: [{
      reviewId: Number,
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      photoUrl: { type: String, required: true },
      caption: String,
      createdAt: Number,
      updatedAt: Number,
      rating: { type: Number, required: true },
      reviewText: String,
    }],
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
    type: Schema.Types.ObjectId,
    ref: 'reviews',
  }],
});

const reviewsSchema = new Schema({
  dishId: {
    type: Schema.Types.ObjectId,
    ref: 'dishes',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  photoUrl: { type: String, required: true },
  caption: String,
  createdAt: Number,
  updatedAt: Number,
  rating: { type: Number, required: true },
  reviewText: String,
});

const usersSchema = new Schema({
  username: String,
  userPhoto: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'reviews',
  }],
});


module.exports.Restaurant = db.model('restaurants', restaurantsSchema);
module.exports.Dish = db.model('dishes', dishesSchema);
module.exports.Review = db.model('reviews', reviewsSchema);
module.exports.User = db.model('users', usersSchema);
