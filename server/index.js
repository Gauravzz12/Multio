require("dotenv").config();

const http = require("http");
const express = require("express");
const startApiServer = require("./api");
const startSocketServer = require("./socket");
const path = require("path");
const __dirname = path.resolve();
const API_PORT = process.env.API_PORT || 5000;

const app = express();
const server = http.createServer(app);

startApiServer(app);
startSocketServer(server);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../client/dist/index.html"));
  });
}
server.listen(API_PORT, () => {
  console.log(`Server running on port ${API_PORT}`);
});
