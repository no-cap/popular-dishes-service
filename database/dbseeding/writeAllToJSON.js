/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable quote-props */
const fs = require('fs');

const record = {
  "restaurant_id": "<varchar>",
  "restaurant_name": "<str>",
  "location": "<geoson>",
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
};
// 100,000
const someRecords = [Array(100).fill(record)];
// eslint-disable-next-line no-unused-vars
const allRecords = [someRecords, someRecords, someRecords, someRecords];

// Function that returns a write stream to a file called restaurantsCOUNT.json
const openStream = (count, prefix) => (
  fs.createWriteStream(`../JSON_Data/${prefix}/${prefix}${count}.json`, {
    flags: 'a',
  })
);

// This creates an async forEach method which we will use to write records to a json file
const asyncForEach = async (array, callback) => {
  for (let i = 0; i < array.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[i], i, array);
  }
};

/*
  * This fuction writes an array of object records to a json file,
  * logging in the console when each file closes
*/
const writeData = (stream, array) => {
  stream.write('[\n', () => {
    const writeAsync = async (inputStream) => {
      await asyncForEach(array, async (record, i) => {
        await inputStream.write(`${JSON.stringify(record)}${i === array.length -1 ? '' : ','}\n`);
      });
      stream.write(']', () => {
        console.log(`Closing stream to ${stream.path}...`);
        stream.close();
      });
    };
    writeAsync(stream);
  });
};

/*
  * This fuction takes an array of data sets and invokes the
  * writeData function on each, writing each set to a json file
  * NOTE: will not remove trailing comma from final record, will break some browsers!!
*/
const writeAllData = async (array, prefix) => {
  let fileCount = 0;
  await asyncForEach(array, (set) => {
    console.log(`Opening stream to ${prefix}${fileCount}.json...`);
    const writer = openStream(fileCount, prefix);
    fileCount += 1;
    writeData(writer, set);
  });
};

// writeAllData(allRecords, 'restaurants');
module.exports = writeAllData;
