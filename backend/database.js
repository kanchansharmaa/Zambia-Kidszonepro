const { createPool } = require("mysql2");
require("dotenv").config({ path: "../.env" });

console.log(process.env.MYSQL_USER);
const pool = createPool({
  port: process.env.DB_PORT,
  user: process.env.MYSQL_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
});

const pool_148 = createPool({
  port: process.env.DB_PORT_148,
  user: process.env.DB_USER_148,
  host: process.env.DB_HOST_148,
  password: process.env.DB_PASS_148,
  database: process.env.MYSQL_DB_148,
  connectionLimit: 10,
});

module.exports = { pool, pool_148 };
