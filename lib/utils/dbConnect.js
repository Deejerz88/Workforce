const mysql = require("mysql2");
require("dotenv").config();


const dbConnect = () =>
  mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "departments_db",
  });

module.exports = dbConnect;
