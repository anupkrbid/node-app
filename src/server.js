/**
 * One of running the server is to export the express app from app.js
 * and pass it here in the http.createServer() method, make sure to not
 * listen to the port in the app.js in that case
 */

const http = require("http");

const app = require("./app");

const server = http.createServer(app);

server.listen(3000);
