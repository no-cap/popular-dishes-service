# PopularDishes

This project is the PopularDishes component to a restaurant review app. I inherited it, rebuilt the server on a Mongo database, and cleaned and refactored the front end.

## Related Projects
Related projects can be found at: https://github.com/no-cap/

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

The app should be fairly easy to use. Go through the following steps to get it setup:
1. Run command **npm install**
2. Create a .env file in the root directory with a similar structure to **example.env**
3. Start the server with **npm start**

## Database Seeding

To seed the database with fake data, you will first want to copt certain alterations to the *faker* source code. These are listed in **fakerAlteration.js**. 
Next you need only run the following script in the root directory: **npm run gen:dishes <restaurants> <dishesPerRestaurant> <reviewsPerDish>**
*example:* **npm run gen:dishes 10000 4 2**

## Requirements

- Node
- Mongo

## Development

### Installing Dependencies

From within the root directory run: **npm install**

