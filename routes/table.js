const express = require("express");
const mysql = require("mysql2");
const app = express();
require("dotenv").config();

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

app.get("/:table", async (req, res) => {
  const table = req.params.table;
  console.log(table);
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
    JOIN employee as manager ON employee.manager_id = manager.id`;
    const [rows] = await db.promise().query(query, table);
    res.json(rows);
    return;
  }
    if (table === "role") {
      let query = `
    SELECT
      role.id as ID,
      role.title as Title,
      role.salary as Salary,
      department.name AS Department
    FROM ${table}
    JOIN department ON role.department_id = department.id`
      const [rows] = await db.promise().query(query, table);
      res.json(rows);
      return;
    }
  let query = `SELECT department.id as ID, name as Name FROM ${table}`;
  console.log(query);
  const [rows] = await db.promise().query(query, table);
  res.json(rows);
});

module.exports = app;

// 'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',3
/*

*/
