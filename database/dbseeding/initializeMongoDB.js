const db = require('../mongoConnect.js');

db.close(false, (err) => {
  if (err) {
    console.log(`Failed to disconnect from mongodb://${db.host}:${db.port}/${db.name}`);
  } else {
    console.log(`Successfully disconnected from mongodb://${db.host}:${db.port}/${db.name}`);
  }
});
/*
{
  "restaurant_id": "<varchar>",
  "restaurant_name": "<str>",
  "location" : <geoson>,
  "popularDishes": [
    {
      "dish_id": "<varchar>",
      "dish_name": "<str>",
      "price": "<num>",
      "description": "<text>",
      "reviews": [
        {
          "review_id": "<varchar>",
          "date_time": "<date>",
          "rating": "<int>",
          "review_text": "<text>",
          "user": {
            "user_id": "<varchar>",
            "username": "<varchar>",
            "userphoto": "<varchar>"
          },
          "photo": {
            "photo_id": "<varchar>",
            "url": "<varchar>",
            "caption": "<varchar>"
          }
        }
      ]
    }
  ]
}
*/
