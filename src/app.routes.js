const path = require("path");

const express = require("express");

const apiRoutes = require("./api/api.routes");
const rootDir = require("./utils/root-dir");

const appRouter = express.Router();

appRouter.use(apiRoutes);

appRouter.get("/", (req, res, next) => {
  res.send("<h1>Home Page</h1>");
});

appRouter.use((req, res, next) => {
  console.log(rootDir);
  // res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
  res.status(404).render("404", { title: "Page Not Found" });
});

module.exports = appRouter;
