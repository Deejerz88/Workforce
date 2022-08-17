const express = require("express");
const view = require('./view.js')

const app = express();

app.use('/view', view)

module.exports = app;