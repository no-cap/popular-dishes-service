const mongoose = require('mongoose');
const db = require('../mongoConnect.js');

const { Schema } = mongoose;

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

const usersSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  username: String,
  userPhoto: String,
});

db.close(false, (err) => {
  if (err) {
    console.log(`Failed to disconnect from mongodb://${db.host}:${db.port}/${db.name}`);
  } else {
    console.log(`Successfully disconnected from mongodb://${db.host}:${db.port}/${db.name}`);
  }
});
