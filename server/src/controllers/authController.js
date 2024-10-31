const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { pool } = require("../db/config");
const { v4: uuidv4 } = require("uuid");

const generateToken = (user, expiry) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: expiry }
  );
};
module.exports = {
  register: async (req, res) => {
    try {
      const { email, userName, pwd } = req.body;
      const ifExists = await pool.query(
        `SELECT email, username FROM users WHERE email = $1 OR username = $2 LIMIT 1;`,
        [email, userName]
      );
      if (ifExists.rowCount > 0) {
        const existingUser = ifExists.rows[0];
        if (
          existingUser.email === email &&
          existingUser.username === userName
        ) {
          return res
            .status(409)
            .json({ message: "Email & Username already exist" });
        } else if (existingUser.username === userName) {
          return res.status(409).json({ message: "Username already exists" });
        } else {
          return res.status(409).json({ message: "Email already exists" });
        }
      }
      const hashedPassword = bcrypt.hashSync(pwd, 10);
      const id = uuidv4();
      const newUser = await pool.query(
        "INSERT INTO users (id,username,email, password) VALUES ($1, $2, $3,$4) RETURNING *;",
        [id, userName, email, hashedPassword]
      );
      console.log(newUser);
      res.status(201).json({ message: "User Registered Successfully" });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "An error occurred during registration" });
    }
  },

  login: async (req, res) => {
    try {
      const { user, pwd } = req.body;
      const checkUser = await pool.query(
        "Select * from users where email=$1 or username=$1",
        [user]
      );
      if (checkUser.rowCount > 0) {
        const passMatch = bcrypt.compareSync(pwd, checkUser.rows[0].password);
        if (passMatch) {
          const accessToken = generateToken(checkUser.rows[0], "15m");
          const refreshToken = generateToken(checkUser.rows[0], "7d");

          const addToken = await pool.query(
            "UPDATE users SET refreshtoken = $1 WHERE id = $2",
            [refreshToken, checkUser.rows[0].id]
          );
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            //  secure:true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res
            .status(200)
            .json({ message: "Log in Successfull", accessToken });
        } else {
          return res.status(401).json({ message: "Incorrect Password" });
        }
      } else {
        return res.status(404).json({ message: "User Doesn't Exist" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "An error occurred during Login" });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken)
        return res.status(401).json({ message: "Unauthorized" });

      const userResult = await pool.query(
        "SELECT * FROM users WHERE refreshtoken = $1",
        [refreshToken]
      );
      if (userResult.rowCount === 0)
        return res.status(403).json({ message: "Forbidden" });

      const user = userResult.rows[0];

      jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id)
          return res.status(403).json({ message: "Forbidden" });

        const newAccessToken = generateToken(user, "15m");
        res.json({
          accessToken: newAccessToken,
          user: { id: user.id, username: user.username },
        });
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred during token refresh" });
    }
  },
};
