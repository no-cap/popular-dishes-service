const fs = require('fs');

const testData_restaurant1 = [
  '1245243',
  'Charleys',
];

const testData_restaurant2 = [
  '327531',
  'Macs',
];

const testData_dishes1 = [
  '67456483',
  'Super Manly but non-gendered Salad',
  10.99,
  'Nothing not-manly about this one... No sirree',
  '1245243',
];

const testData_dishes2 = [
  '3223621',
  'Impossible Burger',
  12.99,
  'A super delicious burger to relive you of hunger',
  '327531',
];

const restaurantHeaders = ['id', 'restaurant_name'];
const dishesHeaders = ['id', 'dish_name', 'price', 'description', 'restaurant_id'];

const testData_restaurants = {
  headers: restaurantHeaders,
  data: [[testData_restaurant1, testData_restaurant2],
    [testData_restaurant1, testData_restaurant2]],
};
const testData_dishes = {
  headers: dishesHeaders,
  data: [[testData_dishes1, testData_dishes2], [testData_dishes1, testData_dishes2]],
};
const allData = [testData_restaurants, testData_dishes];

// Function that returns a write stream to a file called prefixCOUNT.csv
const openStream = (prefix) => (
  fs.createWriteStream(`../${prefix}.csv`, {
    flags: 'a',
  })
);

// This creates an async forEach method which we will use to write records to a json file
async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[i], i, array);
  }
}

/*
  * This fuction writes an array records to a csv file,
*/
const writeData = (stream, array) => {
  const writeAsync = async (inputStream) => {
    await asyncForEach(array, async (record) => {
      const stringified = JSON.stringify(record);
      const trimmedRow = stringified.slice(1, stringified.length - 1);
      await inputStream.write(`${trimmedRow},\n`);
    });
  };
  writeAsync(stream);
};

/*
  * This fuction takes an array of arrays of records and calls
  * writeData function on each, writing each set to a csv file
*/
const writeAllData = (dataObj, prefix) => {
  const stringified = JSON.stringify(dataObj.headers);
  const trimmedHeaders = stringified.slice(1, stringified.length - 1);
  const writer = openStream(prefix);
  writer.write(`${trimmedHeaders},\n`, () => {
    const writeArrayOfSetsAsync = async () => {
      await asyncForEach(dataObj.data, async (set) => {
        writeData(writer, set);
      });
    };
    writeArrayOfSetsAsync(writer);
  });
};
// writeAllData(testData_restaurants, 'restaurants');
// writeAllData(testData_dishes, 'dishes');
module.exports.writeAllToCSV = writeAllData;
