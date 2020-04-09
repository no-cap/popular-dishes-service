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
Next you need only run the following script in the root directory: 
*FOR MONGO* **npm run gen:dishes <restaurants> <dishesPerRestaurant> <reviewsPerDish>**
*example:* **npm run gen:dishes 10000 4 2**

For PostgreSQL, the script is made to write CSV files for each table which you will then need to import into your database. To generate the CSV files:
*FOR POSTGRES* **npm run gen:csv <table> <numberOfRecords> <foreignKeyRange> <isContinuation?>**
*example:* **npm run gen:csv reviews 100000000 10000000**
The above example will generate 10,000,000 review records for the 'reviews' table all with foreign restaurant/user keys between 1 and 10,000,000.
The *isContinuation* variable only determines whether or not to write headers. Any value passed in will turn off headers.

## Requirements

- Node
- Mongo

## Development

### Installing Dependencies

From within the root directory run: **npm install**

