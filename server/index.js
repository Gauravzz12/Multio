require("dotenv").config();
const http = require("http");
const express = require("express");
const startApiServer = require("./api"); 
const startSocketServer = require("./socket");

const API_PORT = process.env.API_PORT || 5000;

const app = express();
const server = http.createServer(app); 
startApiServer(app);
startSocketServer(server);
server.listen(API_PORT, () => {
  console.log(`Server running on port ${API_PORT}`);
});

const shutdown = () => {
  server.close(() => {
    console.log("Server shut down successfully");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown); 
process.on("SIGINT", shutdown); 
