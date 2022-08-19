const express = require("express");
const dbConnect = require("../lib/utils/dbConnect");
// const createRow = require("../lib/rowCRUD/createRow");
// const updateRow = require("../lib/rowCRUD/updateRow");
// const deleteRow = require("../lib/rowCRUD/deleteRow");
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
    role.id AS ID,
    role.title AS Title,
    role.salary AS Salary,
    department.name AS Department
  FROM role
  LEFT JOIN department ON role.department_id = department.id
  ORDER BY role.id;`;
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

app.route("/:ref/:id")
  .delete(async (req, res) => {
  const ref = req.params.ref;
  const id = req.params.id;
  const rows = await Crud.delete(db, "role", id, ref);
  res.json(rows);
});

module.exports = app;
