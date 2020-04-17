/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
const faker = require('faker');
const { ObjectID, MongoClient } = require('mongodb');
require('dotenv').config();

const randomNum = (min, max) => Math.floor((Math.random() * (max - min) + min));
const NumberOfRestaurants = parseInt(process.argv[2], 10) || 15000;

const adjective = ['Organic', 'Edible', 'Tart', 'Hot', 'Spicy', 'SweetNSour', 'Savoury', 'Bittersweet', 'Seasoned', 'Fresh', 'Ketchupy', 'Garlicy', 'Roasted', 'Grilled', 'Fried', 'DeepFried', 'Grilled', 'Family', 'Sweet', 'Savory', 'Super', 'Giant', 'Summer', 'Winter', 'Wasabi', 'Whipped', 'Spring', 'BigOl', 'Tasty', 'BiteSize', 'Blended', 'Aged', 'Boiled', 'Candied', 'Carmelized', 'CharBroiled', 'Chocolate', 'Delectable', 'Delightful', 'Famous', 'Flaky', 'Fluffy', 'Frozen', 'Ginger', 'Golden', 'Toasted', 'Hearty', 'Hot', 'Intense', 'Jumbo', 'Mini', 'Lavish', 'Lite', 'Lukewarm', 'MouthWatering', 'Natural', 'Peppery', 'Peppered', 'Blackened', 'Pickled', 'Poached', 'Scrumptious', 'Silky', 'Smoked', 'Smoky', 'Smooth', 'Sprinkled', 'Steamy', 'Steamed', 'Succulent', 'Sugary', 'Strawberry', 'Sweetened', 'Thin', 'Thick', 'Fat', 'Traditional', 'Velvety', 'Zesty', 'Zingy', 'Crisp', 'Crispy', 'Crumbly', 'Crunchy', 'Sour', 'Juicy', 'Vegan', 'Big', 'Delicious'];
const cuisine = ['Italian', 'Southern', 'Cajun', 'Lebanese', 'Jamaican', 'Tunisian', 'Danish', 'Belgian', 'Indonesian', 'Swedish', 'Norwegian', 'Soul', 'British', 'Haute', 'Armenian', 'Vegetarian', 'Chilean', 'Hawaiian', 'Mediterranean', 'Greek', 'American', 'Fusion', 'Peruvian', 'Argentinian', 'Thai', 'Indian', 'Japanese', 'Canadian', 'German', 'French', 'Spanish', 'Ethiopian', 'Arabian', 'Polish', 'Lithuanian', 'Georgian', 'Cuban', 'Sicilian', 'Moroccan', 'Vietnamese', 'Bulgarian', 'Chinese', 'Mexican', 'Russian', 'Slavic', 'European', 'French', 'Japanese', 'Korean', 'German', 'Turkish', 'Samoan', 'Filipino', 'Cambodian', 'Burmese', 'Pakistani', 'Afghan', 'Persian', 'Iranian', 'British'];
const foodSingular = ['Burger', 'Chow', 'Grub', 'Avocado', 'Breakfast', 'Lunch', 'Dinner', 'BlackBeans', 'Brunch', 'Buckwheat', 'Broccoli', 'BoysenberryPie', 'Brownie', 'Cheesecake', 'Cereal', 'Carrots', 'Coffee', 'Chickpeas', 'Falafel', 'Schwarma', 'CollardGreens', 'Corn', 'Doughnut', 'Eggplant', 'FrenchFries', 'Mushroom', 'Granola', 'Lettuce', 'HoneyDew', 'Jackfruit', 'Kumquat', 'Loquat', 'Lemonade', 'Maize', 'Milkshake', 'Mochi', 'Noodles', 'Omelet', 'Pineapple', 'PeanutButter', 'Persimmon', 'PotRoast', 'Picnic', 'Pretzel', 'Edamame', 'SplitPeas', 'Stew', 'Porridge', 'Squash', 'Supper', 'SweetPotato', 'Turnips', 'Cookie', 'Curry', 'Bowl', 'Enchilada', 'Poke', 'Bean', 'Sushi', 'Pizza', 'BBQ', 'Summer Salad', 'Casserole', 'Chili Bowl', 'Soup', 'Pie', 'Cake', 'Burrito', 'Taco', 'Salad', 'Pho', 'Chili', 'Momo', 'StirFry', 'FishNChips', 'MacNCheese', 'Pasta', 'Spaghetti'];
const prefixes = [adjective, cuisine];
const prefixSet = prefixes[randomNum(0, 2)]; // gives each record a random prefix set

// Create containers for each record, these will later be add to bulk insertion ops
const allRestaurants = [];
const allUsers = [];

const someUser = (review) => {
  // console.log(review.userId);
  const newUser = {
    _id: review.userId,
    username: faker.name.firstName(),
    friendCount: randomNum(0, 200),
    userPhoto: `https://sdc-users.s3-us-west-1.amazonaws.com/${randomNum(0, 71)}.png`,
    reviews: [review.reviewId],
  };
  allUsers.push(newUser);
};

// Takes a restaurant and creates a set of popular dishes for that restaurant from its IDs
const someReviews = (num) => {
  const reviews = [];
  for (let i = 0; i < num; i += 1) {
    const newReview = {
      reviewId: new ObjectID(),
      userId: new ObjectID(),
      photoUrl: `https://sdc-food.s3-us-west-1.amazonaws.com/${randomNum(0, 738)}.jpg`,
      caption: faker.lorem.words(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      rating: randomNum(1, 6),
      reviewText: faker.lorem.sentences(),
    };
    reviews.push(newReview);
    someUser(newReview);
  }
  return reviews;
};

const someDishes = (num) => {
  const dishes = [];
  for (let i = 0; i < num; i += 1) {
    const noOfReviews = randomNum(0, 8);
    const newDish = {
      dishName: `${prefixSet[randomNum(0, prefixSet.length)]} ${foodSingular[randomNum(0, foodSingular.length)]}`,
      price: `${randomNum(6, 25)}.${randomNum(80, 100)}`,
      description: `${faker.lorem.words()} ${faker.lorem.words()}`,
      reviews: someReviews(noOfReviews),
    };
    dishes.push(newDish);
  }
  return dishes;
};

const someRestaurants = () => {
  for (let i = 0; i < NumberOfRestaurants; i += 1) {
    const noOfDishes = randomNum(0, 8);
    const newId = new ObjectID();
    // console.log(newId);
    const newRestaurant = {
      _id: newId,
      restaurantName: faker.company.companyName(),
      dishes: someDishes(noOfDishes),
    };
    allRestaurants.push(newRestaurant);
  }
};

someRestaurants();
const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST1, MONGO_HOST2, MONGO_HOST3, MONGO_DB } = process.env;
const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST1}/${MONGO_DB}`;

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
  if (err) console.error(`Failed to connect to database:\n${err}`);
  else console.log(`Successfully connected to ${process.env.MONGO_HOST}`);
  const db = client.db(process.env.MONGO_DB);

  // Initialize unordered Batches
  const restaurantsBatch = db.collection('restaurants').initializeUnorderedBulkOp({ useLegacyOps: true });
  const usersBatch = db.collection('users').initializeUnorderedBulkOp({ useLegacyOps: true });

  // Add some operations to be appropriate batches...
  allRestaurants.forEach((restaurant) => {
    restaurantsBatch.insert(restaurant);
  });
  allUsers.forEach((user) => {
    usersBatch.insert(user);
  });

  let successfulBatchInsertions = 0;
  // And execute batches...
  restaurantsBatch.execute((err, result) => {
    if (err) console.error(err);
    // Check state of result
    console.log(`Inserted ${result.nInserted} restaurant records`);
    successfulBatchInsertions += 1;
    // 4 successful insertions means all records have been inserted.
    if (successfulBatchInsertions === 2) {
      client.close();
      // process.exit(1);
    }
  });

  usersBatch.execute((err, result) => {
    if (err) console.error(err);
    // Check state of result
    console.log(`Inserted ${result.nInserted} user records`);
    successfulBatchInsertions += 1;
    // 4 successful insertions means all records have been inserted.
    if (successfulBatchInsertions === 2) {
      client.close();
      // process.exit(1);
    }
  });
});
