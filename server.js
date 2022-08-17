const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const con = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: process.env.MYSQL_USERNAME,
    // MySQL password
    password: process.env.MYSQL_PASSWORD,
    database: 'departments_db',
  },
  console.log(`Connected to the departments_db database.`)
);
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
