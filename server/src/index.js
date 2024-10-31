const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get("/", (req, res) => {
  console.log("Hello")
  res.send("Welcome to the Authentication API");
});
app.use("/auth", authRoutes);
const PORT = process.env.PGPORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
