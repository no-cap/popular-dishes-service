/* eslint-disable no-nested-ternary */
const fs = require('fs');
const cliProgress = require('cli-progress');
const { restaurant, dish, review, user } = require('./genDishesCSV');

// Allows user to pass arguments to command line for different record types
const model = process.argv[2] === 'restaurants' ? restaurant
  : process.argv[2] === 'dishes' ? dish
    : process.argv[2] === 'reviews' ? review
      : process.argv[2] === 'users' ? user
        : restaurant;

const numberOfRecords = parseInt(process.argv[3], 10);
const isContinuation = process.argv[5] || false;

// create new progress bar for command line visualization
const ProgressBar = new cliProgress.SingleBar({
  format: `|| {bar} || {percentage}% || {value}/{total} Records || ${model.table}`,
  stopOnComplete: true,
}, cliProgress.Presets.shades_grey);
ProgressBar.start(numberOfRecords, 0);

// filePath to be passed to createWriteStream
const filePath = `../${model.table}7.csv`;

// This function takes an array and turns it into a string without brackets or trailing comma
const trimArray = (array) => {
  const stringified = JSON.stringify(array);
  return stringified.slice(1, stringified.length - 1);
};

const writeRecords = (model) => {
  const writer = fs.createWriteStream(filePath, { flags: 'a' });
  writer.write(`${!isContinuation ? `${trimArray(model.headers)}\n` : ''}`, () => {
    // have to open a second one because the first one kept dying early
    const writer2 = fs.createWriteStream(filePath, { flags: 'a' });
    for (let i = 0; i < numberOfRecords; i += 1) {
      writer2.write(`${trimArray(model())}${i === model.headers.length - 1 ? ',' : ''}\n`, () => {
        ProgressBar.increment();
      });
    }
  });
};

writeRecords(model);
