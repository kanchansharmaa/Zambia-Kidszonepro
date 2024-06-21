const mysql = require('mysql2');

require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
});

module.exports = pool