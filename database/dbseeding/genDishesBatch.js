/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
const faker = require('faker');
const { ObjectID, MongoClient } = require('mongodb');
require('dotenv').config();

const randomNum = (min, max) => Math.floor((Math.random() * (max - min) + min));
const NumberOfRestaurants = parseInt(process.argv[2], 10) || 15000;
const DishesPerRestaurant = parseInt(process.argv[3], 10) || 4;
const ReviewsPerDish = parseInt(process.argv[4], 10) || 2;

const adjective = ['Organic', 'Fresh', 'Ketchupy', 'Garlicy', 'Roasted', 'Grilled', 'Fried', 'DeepFried', 'Grilled', 'Family', 'Sweet', 'Savory', 'Super', 'Giant', 'Summer', 'Winter', 'Spring', 'BigOl', 'Tasty', 'Juicy', 'Vegan', 'Big', 'Delicious'];
const cuisine = ['Italian', 'Thai', 'Indian', 'Japanese', 'Canadian', 'German', 'French', 'Spanish', 'Ethiopian', 'Arabian', 'Polish', 'Lithuanian', 'Georgian', 'Cuban', 'Sicilian', 'Moroccan', 'Vietnamese', 'Bulgarian', 'Chinese', 'Mexican', 'Russian', 'Slavic', 'European', 'French', 'Japanese', 'Korean', 'German', 'British'];
const foodSingular = ['Burger', 'Cookie', 'Curry', 'Bowl', 'Enchilada', 'Poke', 'Bean', 'Sushi', 'Pizza', 'BBQ', 'Summer Salad', 'Casserole', 'Chili Bowl', 'Soup', 'Pie', 'Cake', 'Burrito', 'Taco', 'Salad', 'Pho', 'Chili', 'Momo', 'StirFry', 'FishNChips', 'MacNCheese', 'Pasta', 'Spaghetti'];
const prefixes = [adjective, cuisine];
const prefixSet = prefixes[randomNum(0, 2)]; // gives each record a random prefix set

// Create containers for each record, these will later be add to bulk insertion ops
const allRestaurants = [];
const allDishes = [];
const allReviews = [];
const allUsers = [];

// Generates a set of unique Ids
const genIDs = (num) => {
  const IDs = [];
  for (let i = 0; i < num; i += 1) {
    IDs.push(new ObjectID());
  }
  return IDs;
};

const someRestaurants = () => {
  const restaurants = [];
  for (let i = 0; i < NumberOfRestaurants; i += 1) {
    const newRestaurant = {
      _id: new ObjectID(),
      restaurantName: faker.company.companyName(),
      popularDishes: genIDs(DishesPerRestaurant),
    };
    restaurants.push(newRestaurant);
    allRestaurants.push(newRestaurant);
  }
  return restaurants;
};

// Takes a restaurant and creates a set of popular dishes for that restaurant from its IDs
const someDishes = (restaurant) => {
  const dishes = [];
  for (let i = 0; i < DishesPerRestaurant; i += 1) {
    const newDish = {
      _id: restaurant.popularDishes[i],
      dishName: `${prefixSet[randomNum(0, prefixSet.length)]} ${foodSingular[randomNum(0, foodSingular.length)]}`,
      price: `${randomNum(6, 25)}.${randomNum(80, 100)}`,
      description: `${faker.lorem.words()} ${faker.lorem.words()}`,
      restaurantId: restaurant._id,
      reviews: genIDs(ReviewsPerDish),
    };
    dishes.push(newDish);
    allDishes.push(newDish);
  }
  return dishes;
};

const someReviews = (dish) => {
  const reviews = [];
  for (let i = 0; i < dish.reviews.length; i += 1) {
    const newReview = {
      _id: dish.reviews[i],
      dishId: dish._id,
      userId: genIDs(1)[0],
      photoUrl: `https://sdc-food.s3-us-west-1.amazonaws.com/${randomNum(0, 738)}.jpg`,
      caption: faker.lorem.words(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      rating: randomNum(1, 6),
      reviewText: faker.lorem.sentences(),
    };
    reviews.push(newReview);
    allReviews.push(newReview);
  }
  return reviews;
};

const someUser = (review) => {
  const users = [];
  const newUser = {
    _id: review.userId,
    username: faker.name.firstName(),
    userPhoto: `https://sdc-users.s3-us-west-1.amazonaws.com/${randomNum(0, 71)}.png`,
    reviews: [review._id],
  };
  users.push(newUser);
  allUsers.push(newUser);
  return users;
};

const generateSet = () => {
  someRestaurants().forEach((restaurant) => {
    someDishes(restaurant).forEach((dish) => {
      someReviews(dish).forEach((review) => {
        someUser(review);
      });
    });
  });
};
generateSet();

MongoClient.connect(process.env.MONGO_HOST, { useUnifiedTopology: true }, (err, client) => {
  if (err) console.error(`Failed to connect to database:\n${err}`);
  else console.log(`Successfully connected to ${process.env.MONGO_HOST}`);
  const db = client.db(process.env.MONGO_DB);

  // Initialize unordered Batches
  const restaurantsBatch = db.collection('restaurants').initializeUnorderedBulkOp({ useLegacyOps: true });
  const dishesBatch = db.collection('dishes').initializeUnorderedBulkOp({ useLegacyOps: true });
  const reviewsBatch = db.collection('reviews').initializeUnorderedBulkOp({ useLegacyOps: true });
  const usersBatch = db.collection('users').initializeUnorderedBulkOp({ useLegacyOps: true });
  const allBatches = [restaurantsBatch, dishesBatch, reviewsBatch, usersBatch];

  // Add some operations to be appropriate batches...
  allRestaurants.forEach((restaurant) => {
    restaurantsBatch.insert(restaurant);
  });
  allDishes.forEach((dish) => {
    dishesBatch.insert(dish);
  });
  allReviews.forEach((review) => {
    reviewsBatch.insert(review);
  });
  allUsers.forEach((user) => {
    usersBatch.insert(user);
  });
  // And execute batches...
  let successfulBatchInsertions = 0;
  allBatches.forEach((batch) => {
    batch.execute((err, result) => {
      if (err) console.error(err);
      // Check state of result
      console.log(`Inserted ${result.nInserted} records`);
      successfulBatchInsertions += 1;
      // 4 successful insertions means all records have been inserted.
      if (successfulBatchInsertions === 4) {
        client.close();
        // process.exit(1);
      }
    });
  });
});
