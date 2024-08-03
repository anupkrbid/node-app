const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const expHbs = require("express-handlebars");

const appRoutes = require("./app.routes");
const rootDir = require("./utils/root-dir");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.engine("hbs", expHbs());
app.set("view engine", "hbs");
app.set("views", path.join(rootDir, "views"));

app.use(appRoutes);

app.listen(3000);
