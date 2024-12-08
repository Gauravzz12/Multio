const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const startApiServer = (app) => {
  app.use(
    cors({
      origin: ["http://localhost:5173","https://multio.netlify.app"],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(passport.initialize());

  app.use("/auth", authRoutes);
  app.use("/user",userRoutes); 
   
};

module.exports = startApiServer;
