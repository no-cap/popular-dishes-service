const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const restaurantsSchema = new Schema({
  restaurantName: String,
  popularDishes: [{
    type: Schema.Types.ObjectId,
    ref: 'popularDishes',
  }],
});

const popularDishesSchema = new Schema({
  dishName: String,
  price: Number,
  description: String,
  reviews: [
    {
      reviewId: {
        type: Schema.Types.ObjectId,
        ref: 'reviews',
      },
      dateTime: Date,
      rating: Number,
      reviewText: String,
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      username: String,
      userPhoto: String,
      photoId: {
        type: Schema.Types.ObjectId,
        ref: 'photos',
      },
      photoUrl: String,
      photoCaption: String,
    },
  ],
});

const reviewsSchema = new Schema({
  dishId: {
    type: Schema.Types.ObjectId,
    ref: 'popularDishes',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  dateTime: Date,
  rating: Number,
  reviewText: String,
});

const photosSchema = new Schema({
  url: { type: String, required: true },
  caption: String,
  reviewId: {
    type: Schema.Types.ObjectId,
    ref: 'reviews',
  },
});

const usersSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  username: String,
  userPhoto: String,
});

module.exports.Restaurant = model('restaurants', restaurantsSchema);
module.exports.PopularDish = model('popularDishes', popularDishesSchema);
module.exports.Review = model('reviews', reviewsSchema);
module.exports.User = model('users', usersSchema);
module.exports.Photo = model('photos', photosSchema);
