const express = require("express");
const mysql = require("mysql2");
const axios = require("axios").default;
const cTable = require("console.table");

const port = process.env.PORT || 3001;
require("dotenv").config();

const app = express();

let db;
app.use((req, res, next) => {
  db = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "departments_db",
  });
  console.log("connected to departments_db");
  next();
});

app
  .route("/:table")
  .get(async (req, res) => {
    const table = req.params.table;
    console.log({ table });
    if (table === "employee") {
      let query = `
        SELECT
          employee.id AS ID, 
          employee.first_name AS First, 
          employee.last_name AS Last, 
          role.title AS 'Job Title',
          role.salary AS Salary,
          department.name AS Department,
          CONCAT(manager.first_name," ",manager.last_name) AS Manager
        FROM ${table}
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee as manager ON employee.manager_id = manager.id
        ORDER BY employee.id;`;
      const [rows] = await db.promise().query(query, table);
      res.json(rows);
      return;
    } else if (table === "role") {
      let query = `
        SELECT
          role.id AS ID,
          role.title AS Title,
          role.salary AS Salary,
          department.name AS Department
        FROM ${table}
        JOIN department ON role.department_id = department.id
        ORDER BY role.id;`;
      const [rows] = await db.promise().query(query, table);
      res.json(rows);
      return;
    } else {
      let query = `SELECT 
          department.id AS ID,
          name AS Name
        FROM ${table}
        ORDER BY department.id;`;
      const [rows] = await db.promise().query(query, table);
      res.json(rows);
    }
  })
  .post(async (req, res) => {
    let returnData = {};
    const table = req.params.table;
    const tables = ["department", "role", "employee"];
    if (!tables.includes(table)) res.status(404).end();
    const columns = Object.keys(req.body);
    const placeholders = columns.map((v) => "?").toString();
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    const [rows] = await db
      .promise()
      .query(query, [...Object.values(req.body)]);
    axios
      .get(`http://localhost:${port}/${table}`)
      .then((result) => {
        returnData = result.data;
        res.json(returnData);
      })
      .catch((err) => {
        console.log(err);
      });
  }).put(async (req, res) => { });

module.exports = app;
