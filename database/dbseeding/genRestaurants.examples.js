/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
const faker = require('faker');
const { ObjectID, MongoClient } = require('mongodb');
require('dotenv').config();

const randomNum = (min, max) => Math.floor((Math.random() * (max - min) + min));
const NumberOfRestaurants = 1;

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

const superCaliforniaReviews = (num) => {

};

const vegetableGardenReviews = (num) => {

};

const patatatacosReviews = (num) => {

};

const beyondTacosReviews = (num) => {

};

const avocadoSmoothieReviews = (num) => {

};

const volcanoReviews = (num) => {

};

const moleTacosReviews = (num) => {

};

const someDishes = (num) => {
  const dishes = [];

  const newDish1 = {
    dishName: 'Super California',
    price: '10.75',
    description: 'A California classic burrito stuffed with seitan, beans, fresh, pico de gallo, french fries, and guacamole.',
    reviews: superCaliforniaReviews(10),
  };
  dishes.push(newDish1);

  const newDish2 = {
    dishName: 'Vegetable Garden',
    price: '9.75',
    description: 'A crisp burrito filled with our signature rice, black beans, crisp cabbage, pico de gallo, and grilled veggies.',
    reviews: vegetableGardenReviews(5),
  };
  dishes.push(newDish2);

  const newDish3 = {
    dishName: 'Patatatacos',
    price: '5.50',
    description: 'Two corn flour tacos with crispy fried potatoes, grilled veggies, and fresh salsa.',
    reviews: patatatacosReviews(4),
  };
  dishes.push(newDish3);

  const newDish4 = {
    dishName: 'Beyond Tacos',
    price: '6.50',
    description: 'Two corn flour tacos with spiced beyond beef, salsa, and fresh cilantro.',
    reviews: beyondTacosReviews(8),
  };
  dishes.push(newDish4);

  const newDish5 = {
    dishName: 'Avocado Smoothie',
    price: '4.50',
    description: 'This refreshing and lightly sweetened shake is the perfect complement to a spicy taco!',
    reviews: avocadoSmoothieReviews(3),
  };
  dishes.push(newDish5);

  const newDish6 = {
    dishName: 'Volcano',
    price: '10.75',
    description: 'A smoldering, wet burrito filled with spicy seitan, black beans, rice, and veggies.',
    reviews: volcanoReviews(4),
  };
  dishes.push(newDish6);

  const newDish7 = {
    dishName: 'Mole Tacos',
    price: '5.00',
    description: 'Two seasoned beyond beef tacos drizzled with spicy mole sauce and topped with fresh cilantro.',
    reviews: moleTacosReviews(2),
  };
  dishes.push(newDish7);

  return dishes;
};

const someRestaurants = () => {
  for (let i = 0; i < NumberOfRestaurants; i += 1) {
    const newId = new ObjectID();
    console.log(newId);
    const newRestaurant = {
      _id: newId,
      restaurantName: 'Blazing Tacos',
      dishes: someDishes(8),
    };
    allRestaurants.push(newRestaurant);
  }
};

someRestaurants();

MongoClient.connect(process.env.MONGO_HOST, { useUnifiedTopology: true }, (err, client) => {
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
