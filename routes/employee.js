const express = require("express");
const dbConnect = require("../lib/utils/dbConnect");
const Crud = require("../lib/Crud");
const app = express();

let db;
app.use((req, res, next) => {
  db = dbConnect();
  next();
});

app
  .route("/")
  .get(async (req, res) => {
    let query = `
    SELECT
      employee.id AS ID, 
      employee.first_name AS First, 
      employee.last_name AS Last, 
      role.title AS 'Job Title',
      role.salary AS Salary,
      department.name AS Department,
      CONCAT(manager.first_name," ",manager.last_name) AS Manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee as manager ON employee.manager_id = manager.id
    ORDER BY employee.id;`;
    const [rows] = await db.promise().query(query);
    res.json(rows);
  })
  .post(async (req, res) => {
    const { table, data } = req.body;
    const returnData = await Crud.create(db, table, data);
    res.json(returnData);
  })
  .put(async (req, res) => {
    const { table, data } = req.body;
    const returnData = await Crud.update(db, table, data);
    res.json(returnData);
  });

app
  .route("/:ref/:id")
  .get(async (req, res) => {
    const ref = req.params.ref;
    const query = `
      SELECT
        employee.id AS ID, 
        employee.first_name AS First, 
        employee.last_name AS Last, 
        role.title AS 'Job Title',
        role.salary AS Salary,
        department.name AS Department,
        CONCAT(manager.first_name," ",manager.last_name) AS Manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee as manager ON employee.manager_id = manager.id
      WHERE ${ref}.id = ?
      ORDER BY employee.id;`;
    const [rows] = await db.promise().query(query, [req.params.id]);
    res.json(rows);
  })
  .delete(async (req, res) => {
    const ref = req.params.ref;
    const id = req.params.id;
    const rows = await Crud.delete(db, "employee", id, ref);
    res.json(rows);
  });

module.exports = app;
