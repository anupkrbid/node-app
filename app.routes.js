const express = require("express");

const apiRoutes = require("./api/api.routes");

const appRouter = express.Router();

appRouter.use(apiRoutes);

appRouter.get("/", (req, res, next) => {
  res.send("<h1>Home Page</h1>");
});

appRouter.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

module.exports = appRouter;
