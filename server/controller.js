const db = require('../database/index.js');

const getDishes = (request, response) => {
  const restaurant_id = request.query.restaurant_id;
  const query = 'SELECT * FROM PopularDishes WHERE restaurant =' + restaurant_id;
  db.query(query, (err, data) => {
    if (err) {
      response.status(400).send('bad request');
    } else {
      response.send(data);
    }
  });
}

const getPhotos = (request, response) => {
  const dish_id = request.query.dish_id;
  const query = 'SELECT * FROM photos WHERE popular_dish =' + dish_id;
  db.query(query, (err, data) => {
    if (err) {
      response.status(400).send('bad request');
    } else {
      response.send(data);
    }
  });
};

const getCompany = (companyNumber, response) => {
  const query = 'SELECT * FROM Restaurants WHERE restaurant_id = ' + companyNumber;
  db.query(query, (err,data) => {
    if (err) {
      console.log(err);
      response.status(400).send('bad request');
    } else {
      response.send(data);
    }
  });
};

const getReviews = (request, response) => {
  const query = 'SELECT a.*, b.* FROM reviews a INNER JOIN users b ON a.userid = b.userid';
  db.query(query, (err, data) => {
    if (err) {
      response.status(400).send('bad request');
    } else {
      response.send(data.slice(0, request.query.numberOfReviews));
    }
  });
};

module.exports = { getDishes, getPhotos, getCompany, getReviews };
