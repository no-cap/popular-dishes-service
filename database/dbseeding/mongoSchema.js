const { Schema } = require('mongoose');
const db = require('../mongoConnect.js');

const reviewsSubSchema = new Schema({
  _id: Schema.Types.ObjectId,
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

const dishesSubSchema = new Schema({
  dishName: { type: String, required: true },
  price: Number,
  description: String,
  reviews: [reviewsSubSchema],
});

const restaurantsSchema = new Schema({
  restaurantName: { type: String, required: true },
  dishes: [dishesSubSchema],
});

const usersSchema = new Schema({
  username: String,
  userPhoto: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'restaurants.dishes.reviews',
  }],
});


module.exports.Restaurant = db.model('restaurants', restaurantsSchema);
module.exports.User = db.model('users', usersSchema);
