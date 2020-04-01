const aws = require('aws-sdk');
const faker = require('faker');
const config = require('../config.json');
const db = require('./index.js');

// how many companies do we want to be made
const numberOfCompanies = 10;

// maxDishes in a company
const maxDishes = 9;

// Max number of reviews per dish
const maxReviews = 20;

// max number of photos per dish
const maxPhotos = 8;

// region and bucket for aws
const bucket = 'sdc-food';
const region = 'us-west-1';

// function for making one company
const makeCompany = () => new Promise((resolve, reject) => {
  const params = [faker.company.companyName()];
  const query = 'INSERT INTO restaurants (restaurant_name) values(?)';
  db.query(query, params, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

// function for making one dish
const makeDish = (addDish, params) => new Promise((res, rej) => {
  db.query(addDish, params, (err, data) => {
    if (err) {
      rej(err);
    } else {
      res(data);
    }
  });
});

// function for making one photo
const makePhoto = (addPhoto, photoParams) => new Promise((res, rej) => {
  db.query(addPhoto, photoParams, (err) => {
    if (err) {
      rej(err);
    } else {
      res();
    }
  });
});

// function for making one review;
const makeReview = (reviewParams) => new Promise((res, rej) => {
  const query = 'INSERT INTO reviews (userid, date, rating, text, dish_id) values (?,?,?,?,?)';
  db.query(query, reviewParams, (err) => {
    if (err) {
      rej(err);
    } else {
      res();
    }
  });
});

// make users
const makeUser = (imageUrl) => new Promise((res, rej) => {
  const userParams = [faker.name.findName(), imageUrl, Math.floor(Math.random() * 100), Math.floor(Math.random() * 20)];
  const query = 'INSERT INTO users (username, userphoto, reviews, friends) values (?, ?, ?, ?)';
  db.query(query, userParams, (err, data) => {
    if (err) {
      rej(err);
    } else {
      res(data);
    }
  });
});

const formatUrlWithKey = (object) => `https://${bucket}.s3-${region}.amazonaws.com/${object.key}`;

(async function () {
  try {
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: config.aws.accessKey,
      secretAccessKey: config.aws.secretKey,
      region,
    });

    const s3 = new aws.S3();

    const response1 = await s3.listObjectsV2({
      Bucket: bucket,
    }).promise();

    const response2 = await s3.listObjectsV2({
      Bucket: bucket,
    }).promise();

    const imagesArray = response1.Contents;
    const avatarsArray = response2.Contents;

    for (let i = 0; i < numberOfCompanies; i += 1) {
      makeCompany()
        .then((data) => {
          // after making one company we get it's restaurantid
          const restaurantId = data.insertId;
          for (let i = 0; i < maxDishes; i += 1) {
            const reviewCount = Math.round(Math.random() * maxReviews);
            const params = [faker.lorem.word(), faker.random.number(), faker.lorem.words(), reviewCount, restaurantId];
            const addDish = 'INSERT INTO popular_dishes (dish_name, price, description, review_count, restaurant) values (?,?,?,?,?)';
            // then we make multiple dishes with the restaurantid as it's foreign key
            makeDish(addDish, params)
              .then((data) => {
                const dishId = data.insertId;
                for (let o = 0; o < Math.floor(Math.random() * maxPhotos) + 1; o += 1) {
                  const addPhoto = 'INSERT INTO photos (url, caption, popular_dish) values (?,?,?)';
                  const randomObject = imagesArray[Math.floor(Math.random() * imagesArray.length)];
                  const photoUrl = formatUrlWithKey(randomObject);
                  const photoParams = [photoUrl, faker.lorem.words(), dishId];
                  makePhoto(addPhoto, photoParams).catch(() => console.log('Failed to add photo...'));
                }

                for (let k = 0; k < params[3]; k += 1) {
                  const imageUrl = formatUrlWithKey(avatarsArray[Math.floor(Math.random() * imagesArray.length)]);
                  makeUser(imageUrl)
                    .then((response) => {
                      const userid = response.insertId;
                      const reviewParams = [userid, faker.date.past(1), Math.ceil(Math.random() * 5), faker.lorem.sentences(), dishId];
                      makeReview(reviewParams)
                        .then(() => {
                        }).catch(() => console.log('Failed to add review'));
                    }).catch(() => console.log('Failed to add user'));
                }
              }).catch(() => console.log('Failed to add dish'));
          }
        }).catch(() => console.log('Failed to add restaurant'));
    }
  } catch (e) {
    console.log('Error: ', e);
  }
}());
