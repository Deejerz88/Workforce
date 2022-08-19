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
      department.id AS ID,
      name AS Name
    FROM department
    ORDER BY department.id;`;
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
    const roleQuery = `SELECT id, salary FROM role WHERE department_id = ?`;
    const [roles] = await db.promise().query(roleQuery, [req.params.id]);
    let total = 0;
    if (!roles.length) res.json([{ "Utilized Budget": total }]);
    roles.forEach(async (role, i) => {
      let query = `SELECT COUNT(role_id) AS count FROM employee WHERE role_id = ?`;
      const [count] = await db.promise().query(query, [role.id]);
      total += count[0].count * role.salary;
      if (i === roles.length - 1) {
        res.json([{ "Utilized Budget": total }]);
      }
    });
  })
  .delete(async (req, res) => {
    const ref = req.params.ref;
    const id = req.params.id;
    const rows = await Crud.delete(db, "department", id, ref);
    res.json(rows);
  });

module.exports = app;
