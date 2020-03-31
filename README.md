# popular-dishes
repo for the popular dishes component

Note: This component has not yet been refactored to work with Mongo.

Requirements for generating dummy data using this component:

An aws account
A bucket with photos:
    Preferably two folders:
        One with Profile photos,
        One with Food/Not Profile photo type photos

Step 1:
npm i

Step 2:
We need dummy data.
So to set that up.
Go to ./database/index.js and change configuration for mysql connection.

Step 3: 
Load access and secret keys into config.example.json and rename to config.json

Step 4: 
Refactor the ./database/dataGenerator.js function called formatUrlKey to match your amazon bucket url along with bucket names, regions names and folder names.

Step5:
Load Schema to mysql database and use node to run dataGenerator.js.

Step6:
start server: type in terminal  --------> npm start
start transpiler: type in terminal -----> npm run build:react;

Step7: open in browser.