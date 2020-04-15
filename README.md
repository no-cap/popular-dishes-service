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

To seed the database with fake data, you will first want to make certain alterations to the *faker* source code.

Navigate to **database/dbseeding/** and locate the files *company.js* and *words.js*. These need to be copied into **faker/lib/** and **faker/lib/locales/en/lorem** respectively to replace the existing files. What this does is to allow the database seeding scripts to use more restaurant and food related vocabulary in when generating restaurant names, menu items, reviews, and photo captions.

Next you need only run the following script in the root directory: 
*FOR MONGO* **npm run gen:dishes <NumberOfRestaurants>**
*example:* **npm run gen:dishes 10000**
The script will use the database configuration defined in *.env* to connect to a mongod instance, create the designated number of records with random numbers of popular dishes, reviews, and one user for each review, and save these records to the mongo database. 


## Requirements

- Node
- MongoDB

## Development

## Installing Dependencies

From within the root directory run: **npm install**

