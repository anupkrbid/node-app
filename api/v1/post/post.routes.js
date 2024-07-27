const express = require("express");

const postRouter = express.Router();

postRouter.get("/posts", (req, res, next) => {
  res.send(
    `<form action="/posts" method="post"><input name="title"><button type="submit">Submit</button></form>`
  );
});

postRouter.post("/posts", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = postRouter;
