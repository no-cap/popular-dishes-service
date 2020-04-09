const faker = require('faker');

const numberOfRestaurants = parseInt(process.argv[4], 10) || 100;
const numberOfDishes = parseInt(process.argv[4], 10) || 100;
const numberOfUsers = parseInt(process.argv[4], 10) || 100;
const randomNum = (min, max) => Math.floor((Math.random() * (max - min) + min));
const adjective = ['Organic', 'Fresh', 'Ketchupy', 'Garlicy', 'Roasted', 'Grilled', 'Fried', 'DeepFried', 'Grilled', 'Family', 'Sweet', 'Savory', 'Super', 'Giant', 'Summer', 'Winter', 'Spring', 'BigOl', 'Tasty', 'Juicy', 'Vegan', 'Big', 'Delicious'];
const cuisine = ['Italian', 'Thai', 'Indian', 'Japanese', 'Canadian', 'German', 'French', 'Spanish', 'Ethiopian', 'Arabian', 'Polish', 'Lithuanian', 'Georgian', 'Cuban', 'Sicilian', 'Moroccan', 'Vietnamese', 'Bulgarian', 'Chinese', 'Mexican', 'Russian', 'Slavic', 'European', 'French', 'Japanese', 'Korean', 'German', 'British'];
const foodSingular = ['Burger', 'Cookie', 'Curry', 'Bowl', 'Enchilada', 'Poke', 'Bean', 'Sushi', 'Pizza', 'BBQ', 'Summer Salad', 'Casserole', 'Chili Bowl', 'Soup', 'Pie', 'Cake', 'Burrito', 'Taco', 'Salad', 'Pho', 'Chili', 'Momo', 'StirFry', 'FishNChips', 'MacNCheese', 'Pasta', 'Spaghetti'];
const prefixes = [adjective, cuisine];
const prefixSet = prefixes[randomNum(0, 2)];

// RESTAURANT GENERATION
module.exports.restaurant = () => ([faker.company.companyName()]);
module.exports.restaurant.headers = ['restaurant_name'];
module.exports.restaurant.table = 'restaurants';

// DISHES GENERATION
module.exports.dish = () => ([
  `${prefixSet[randomNum(0, prefixSet.length)]} ${foodSingular[randomNum(0, foodSingular.length)]}`,
  parseFloat(`${randomNum(6, 25)}.${randomNum(80, 100)}`, 10),
  `${faker.lorem.words()} ${faker.lorem.words()}`,
  randomNum(16, numberOfRestaurants),
]);
module.exports.dish.headers = ['dish_name', 'price', 'description', 'restaurant_id'];
module.exports.dish.table = 'dishes';

// REVIEWS GENERATION
module.exports.review = () => ([
  randomNum(1, numberOfUsers),
  `https://sdc-food.s3-us-west-1.amazonaws.com/${randomNum(0, 738)}.jpg`,
  faker.lorem.words(),
  randomNum(1, 6),
  faker.lorem.sentences(),
  randomNum(1, numberOfDishes),
]);
module.exports.review.headers = ['user_id', 'url', 'caption', 'rating', 'review_text', 'dish_id'];
module.exports.review.table = 'reviews';

// USERS GENERATION
module.exports.user = () => ([
  faker.name.firstName(),
  `https://sdc-users.s3-us-west-1.amazonaws.com/${randomNum(0, 71)}.png`,
]);
module.exports.user.headers = ['username', 'userphoto'];
module.exports.user.table = 'users';
