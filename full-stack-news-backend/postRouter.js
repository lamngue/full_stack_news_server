const express = require("express");
const dayjs = require("dayjs");
const postRouter = express.Router();
const db = require("./db");

postRouter.get("/", (req, res) => {
  const sqlStatement = "SELECT * FROM news";
  db.query(sqlStatement, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

// Create a post
postRouter.post("/", (req, res) => {
  const { title, content } = req.body;
  const created_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const updated_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const sqlStatement =
    "INSERT INTO news (title, content, created_date, updated_date) VALUES (?, ?, ?, ?)";
  let ret;
  db.query(
    sqlStatement,
    [title, content, created_date, updated_date],
    (err, res) => {
      console.log(err);
      err ? (ret = false) : (ret = true);
    }
  );
  res.json(ret);
});

postRouter.get("/:id", (req, res) => {
  res.json("View Post router " + req.params.id);
});

module.exports = postRouter;
