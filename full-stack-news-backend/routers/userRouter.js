const express = require("express");
const userRouter = express.Router();
const dayjs = require("dayjs");
const db = require("../db/db");

// Register an user
userRouter.post("/", (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  const created_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const updated_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const insertUser =
    "INSERT INTO users (username, email, password, created_date, updated_date) VALUES (?, ?, ?, ?, ?)";
  db.query(
    insertUser,
    [username, email, password, created_date, updated_date],
    (err, result) => {
      if (err) throw err;
      const insertID = result.insertId;
      res.send(insertID);
    }
  );
});

module.exports = userRouter;
