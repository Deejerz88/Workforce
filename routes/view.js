const express = require("express");
const mysql = require("mysql2");
const app = express();
require("dotenv").config();

let db
app.use((req, res, next) => {
  db = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "departments_db",
  });
  console.log('connected to departments_db');
  next();
 })

app.use('/:table', async (req, res) => {
  const table = req.params.table;
  console.log(table);
  const query = `SELECT * FROM ${table}`;
  const [rows] = await db.promise().query(query, table );
  res.json(rows);
 })

module.exports = app;
  
// 'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',