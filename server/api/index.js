const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes"); 

const startApiServer = (app) => {
  app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use("/auth", authRoutes);

  app.get("/", (req, res) => {
    res.send("API is running");
  });
};

module.exports = startApiServer;