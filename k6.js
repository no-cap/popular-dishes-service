/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { check, sleep } from 'k6';

const randomNum = (min, max) => Math.floor((Math.random() * (max - min) + min));

const getRandom = (array) => (array[randomNum(0, array.length)]);
const restaurantIds = [
  '5e96a6cbd7567b25c8b4463e',
  '5e96a6cbd7567b25c8b4465b',
  '5e96a6cbd7567b25c8b44672',
  '5e96a6cbd7567b25c8b44679',
  '5e96a6cbd7567b25c8b446b2',
  '5e96a6cbd7567b25c8b446dd',
  '5e96a6cbd7567b25c8b446f6',
  '5e96a6cbd7567b25c8b446f7',
  '5e96a6cbd7567b25c8b4471c',
  '5e96a6cbd7567b25c8b44743',
  '5e96a6cbd7567b25c8b4475e',
  '5e96a6cbd7567b25c8b4475f',
  '5e96a6cbd7567b25c8b4477c',
  '5e96a6cbd7567b25c8b447ad',
  '5e96a6cbd7567b25c8b447ae',
  '5e96a6cbd7567b25c8b447bf',
  '5e96a6cbd7567b25c8b447fa',
  '5e96a6cbd7567b25c8b44817',
  '5e96a6cbd7567b25c8b44818',
  '5e96a6cbd7567b25c8b44827',
  '5e96a6ef57cac3392c1f1229',
  '5e96a6ef57cac3392c1f1240',
  '5e96a6ef57cac3392c1f1241',
  '5e96a6ef57cac3392c1f1272',
  '5e96a6ef57cac3392c1f127d',
  '5e96a6ef57cac3392c1f1288',
  '5e96a6ef57cac3392c1f129d',
  '5e96a6ef57cac3392c1f12a8',
  '5e96a6ef57cac3392c1f12d5',
  '5e96a6ef57cac3392c1f12d6',
  '5e96a6ef57cac3392c1f12d7',
  '5e96a6ef57cac3392c1f12ec',
  '5e96a6ef57cac3392c1f130b',
  '5e96a6ef57cac3392c1f1310',
  '5e96a6ef57cac3392c1f131f',
  '5e96a6ef57cac3392c1f132a',
  '5e96a6ef57cac3392c1f1343',
  '5e96a6ef57cac3392c1f1346',
  '5e96a6ef57cac3392c1f1365',
  '5e96a6ef57cac3392c1f137c',
];

const userIds = [
  '5e96a72732234732bce0e468',
  '5e96a72732234732bce0e46a',
  '5e96a72732234732bce0e46c',
  '5e96a72732234732bce0e46e',
  '5e96a72732234732bce0e470',
  '5e96a72732234732bce0e472',
  '5e96a72732234732bce0e474',
  '5e96a72732234732bce0e476',
  '5e96a72732234732bce0e478',
  '5e96a72732234732bce0e47a',
  '5e96a72732234732bce0e47c',
  '5e96a72732234732bce0e47e',
  '5e96a72732234732bce0e480',
  '5e96a72732234732bce0e482',
  '5e96a72732234732bce0e484',
  '5e96a72732234732bce0e486',
  '5e96a72732234732bce0e488',
  '5e96a72732234732bce0e48a',
  '5e96a72732234732bce0e48c',
  '5e96a72732234732bce0e48e',
  '5e96a72732234732bce0e490',
  '5e96a72732234732bce0e492',
  '5e96a72732234732bce0e494',
  '5e96a72732234732bce0e496',
  '5e96a72732234732bce0e498',
  '5e96a72732234732bce0e49a',
  '5e96a72732234732bce0e49c',
  '5e96a72732234732bce0e49e',
  '5e96a72732234732bce0e4a0',
  '5e96a72732234732bce0e4a2',
  '5e96a72732234732bce0e4a4',
  '5e96a72732234732bce0e4a6',
  '5e96a72732234732bce0e4a9',
  '5e96a72732234732bce0e4ab',
  '5e96a72732234732bce0e4ad',
  '5e96a72732234732bce0e4af',
  '5e96a72732234732bce0e4b1',
  '5e96a72732234732bce0e4b3',
  '5e96a72732234732bce0e4b5',
  '5e96a72732234732bce0e4b7',
  '5e96a72732234732bce0e4b9',
  '5e96a72732234732bce0e4bb',
  '5e96a72732234732bce0e4bd',
  '5e96a72732234732bce0e4bf',
  '5e96a72732234732bce0e4c1',
  '5e96a72732234732bce0e4c4',
  '5e96a72732234732bce0e4c6',
  '5e96a72732234732bce0e4c8',
  '5e96a72732234732bce0e4ca',
  '5e96a72732234732bce0e4cc',
  '5e96a72732234732bce0e4ce',
  '5e96a72732234732bce0e4d0',
  '5e96a72732234732bce0e4d2',
  '5e96a72732234732bce0e4d4',
  '5e96a72732234732bce0e4d6',
  '5e96a72732234732bce0e4d8',
  '5e96a72732234732bce0e4da',
  '5e96a72732234732bce0e4dc',
  '5e96a72732234732bce0e4de',
  '5e96a72732234732bce0e4e0',
  '5e96a72732234732bce0e4e2',
  '5e96a72732234732bce0e4e4',
  '5e96a72732234732bce0e4e6',
  '5e96a72732234732bce0e4e8',
  '5e96a72732234732bce0e4ea',
];

export const options = {
  stages: [
    { duration: '10s', target: 200 },
  ],
};

export default function () {
  const params = { headers: { 'Content-Type': 'application/json' } };

  // GET /api/restaurants/:restaurantId
  const res = http.get(`http://localhost:3000/api/restaurants/${getRandom(restaurantIds)}`);

  // GET /api/users/:userId
  // const res = http.get(`http://localhost:3000/api/users/${getRandom(userIds)}`);

  // POST /api/restaurants
  // const newRestaurant = JSON.stringify({restaurantName: 'Test Restaurant', dishes: []});
  // const res = http.post('http://localhost:3000/api/restaurants', newRestaurant, params);

  // POST /api/restaurants/:restaurantId/dishes
  // const newDish = JSON.stringify({dishName: 'Test Dish', price: 3.50, description: 'this is a test', reviews: []});
  // const res = http.post(`http://localhost:3000/api/restaurants/${getRandom(restaurantIds)}/dishes`, newDish, params);

  // POST /api/restaurants/:restaurantId/:dishId/reviews
  // const newReview = JSON.stringify({userId: 'Test Dish', photoUrl: , caption: 'It was so good!', createdAt: Date.now(), updatedAt: Date.now(), rating: 5, reviewText: 'I really loved this dish and I will definitely be coming back.'});
  // const res = http.post(`http://localhost:3000/api/restaurants/${getRandom(possibleRestaurantEndpoints)}/${getRandom(dishIds)}`, newDish, params);

  // PUT /api/restaurants/:restaurantId
  // PUT /api/restaurants/:restaurantId/:dishId
  // PUT /api/restaurants/:restaurantId/:dishId/:reviewId

  check(res, {
    'status was 200': (r) => r.status === 230,
    'transaction time OK': (r) => r.timings.duration < 2000,
  });
  sleep(1);
}
