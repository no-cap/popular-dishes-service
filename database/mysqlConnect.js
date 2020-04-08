const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Connected to ${process.env.MYSQL_DB}`);
  }
});

module.exports = connection;
