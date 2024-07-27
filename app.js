const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In First Middleware");
  next();
});

app.use((req, res, next) => {
  console.log("In Second Middleware");
  res.send("Simple node app");
});

module.exports = app;
