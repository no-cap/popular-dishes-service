const Model = require('../models/mongo.model.js');


/*
  * POST ROUTES
*/

module.exports.postDish = (req, res) => {
  const newDish = req.body;
  Model.postDish(newDish, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};

module.exports.postReview = (req, res) => {
  const newReview = req.body;
  Model.postDish(newReview, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(result);
    }
  });
};
