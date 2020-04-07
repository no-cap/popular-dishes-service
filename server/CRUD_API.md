## CRUD API

### POST

`/api/restaurants/:restaurantID/dishes`

**Purpose**: Adding a dish to a restaurant

**Expects**: An object describing a menu item with the following properties...
```json
{
  "dish_name": "<str>",
  "price": "<num>",
  "description": "<text>",
}
```

`/api/restaurants/:restaurantID/dishes/:dishID/reviews`

**Purpose**: Adding a review to a dish

**Expects**: An object with the following properties...
*note:* API does not currently support image uploading
```json
{
  "date_time": "<date>",
  "rating": "<int>",
  "review_text": "<text>",
  "user": {
    "user_id": "<varchar>",
  },
  "photo": {
    "url": "<varchar>",
    "caption": "<varchar>"
  }
}
```
______________________________________________________
### GET

`/api/restaurants/:restaurantID/dishes`

**Purpose**: Retrieving all of a restaurant's popular-dishes related data

**Response**: JSON object containing an array of popular dishes, reviews for each dish, etc...
```json
{
  "restaurant_id": "<varchar>",
  "restaurant_name": "<str>",
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
          "user_id": "<varchar>",
          "username": "<varchar>",
          "user_photo": "<varchar>",
          "photo_id": "<varchar>",
          "photo_url": "<varchar>",
          "photo_caption": "<varchar>"
        }
      ]
    }
  ]
}
```

`/api/restaurants/:restaurantID/nearby`

**Purpose**: Retrieving nearby restaurants

**Response**: JSON object containing an array of nearby restaurants...
```json
[
  {
    "restaurant_id": "<varchar>"
  }
]
```

______________________________________________________
### PUT

`/api/restaurants/:restaurantID/dishes`

**Purpose**: Updating a restaurant's dish

**Expects**: An object with the following properties...
```json
{
  "dish_name": "<str>",
  "price": "<num>",
  "description": "<text>",
}
```

`/api/restaurants/:restaurantID/dishes/:dishID/reviews/:reviewID`

**Purpose**: Updating a dish's review

**Expects**: An object with the following properties...
*note:* API does not currently support image uploading
```json
{
  "date_time": "<date>",
  "rating": "<int>",
  "review_text": "<text>",
  "user": {
    "user_id": "<varchar>",
  },
  "photo": {
    "url": "<varchar>",
    "caption": "<varchar>"
  }
}
```
______________________________________________________
### DELETE

`/api/restaurants/:restaurantID/dishes/:dishID`

**Purpose**: Removing a restaurant's dish

`/api/restaurants/:restaurantID/dishes/:dishID/reviews/:reviewID`

**Purpose**: Removing a review from a popular dish



