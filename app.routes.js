const express = require("express");

const postRoutes = require("./api/v1/post/post.routes");

const appRouter = express.Router();

appRouter.use(postRoutes);

appRouter.use("/", (req, res, next) => {
  res.send("<h1>Home Page</h1>");
});

module.exports = appRouter;
