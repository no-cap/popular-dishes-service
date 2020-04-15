/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { check, sleep } from 'k6';

const randomNum = (min, max) => Math.floor((Math.random() * (max - min) + min));

const getRandom = (array) => (array[randomNum(0, array.length)]);
const restaurantIds = [
];

const userIds = [
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
