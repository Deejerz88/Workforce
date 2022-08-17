const express = require("express");
const table = require('./table.js')

const app = express();

app.use('/table', table)

module.exports = app;