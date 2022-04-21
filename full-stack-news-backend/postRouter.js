const express = require('express')
const postRouter = express.Router()
const db = require('./db')

postRouter.get("/", (req, res) => {
    res.json("Get All post router")
});

postRouter.post("/", (req, res) => {
  const sqlStatement = `INSERT INTO news (title, content, created_date, updated_date) VALUES (?, ?, ?, ?)`;
  res.json("Get All post router")
});

postRouter.get("/:id", (req, res) => {
  res.json("View Post router " + req.params.id)
})

module.exports = postRouter