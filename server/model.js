const db = require('../database/index.js');

const getDishes = (restaurantId, callback) => {
  const query = `SELECT * FROM popular_dishes WHERE restaurant = ${restaurantId}`;
  db.query(query, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const getPhotos = (dishId, callback) => {
  const query = `SELECT * FROM photos WHERE popular_dish = ${dishId}`;
  db.query(query, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const getCompany = (companyNumber, response) => {
  const query = `SELECT * FROM restaurants WHERE restaurant_id = ${companyNumber}`;
  db.query(query, (err, data) => {
    if (err) {
      console.log(err);
      response.status(400).send('bad request');
    } else {
      response.send(data);
    }
  });
};

const getReviews = (numberOfReviews, callback) => {
  const query = 'SELECT a.*, b.* FROM reviews a INNER JOIN users b ON a.userid = b.userid';
  db.query(query, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data.slice(0, numberOfReviews));
    }
  });
};

module.exports = { getDishes, getPhotos, getCompany, getReviews };
