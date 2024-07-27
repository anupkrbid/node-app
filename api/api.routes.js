const express = require("express");

const postV1Routes = require("./v1/post/post.routes");

const apiRouter = express.Router();

apiRouter.use("/api/v1", postV1Routes);

module.exports = apiRouter;
