const express = require("express");
const userRouter = express.Router();
const dayjs = require("dayjs");
const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10;

// Register an user and login
userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const created_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const updated_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const queryUser = "SELECT * FROM users WHERE username = ?";
  const insertUser =
    "INSERT INTO users (username, email, password, created_date, updated_date) VALUES (?, ?, ?, ?, ?)";
  const pool = db.promise();
  try {
    const [rows, fields] = await pool.query(queryUser, [username]);
    if (rows.length === 0) {
      const hashPassword = await bcrypt.hash(password, saltRounds);
      await pool.query(insertUser, [
        username,
        email,
        hashPassword,
        created_date,
        updated_date,
      ]);
      res.send("Registered User");
    } else {
      res.send("User already exists");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const queryUser = "SELECT * FROM users WHERE username = ?";
  const pool = db.promise();
  try {
    const [rows, fields] = await pool.query(queryUser, [username]);
    if (rows.length === 1) {
      const passValid = await bcrypt.compare(password, rows[0].password);
      if (passValid) {
        const token = jwt.sign(
          {
            id: rows[0].ID,
            username,
            password,
          },
          process.env.ACCESS_TOKEN_SECRET
        );
        res.json({
          token,
          user: rows[0],
        });
      } else {
        res.send("Wrong password!");
      }
    } else {
      res.send("Wrong username or password!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send("User logged out!");
});

module.exports = userRouter;
