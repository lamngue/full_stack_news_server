const express = require("express");
const categoriesRouter = express.Router();
const db = require("./db");

categoriesRouter.get("/", (req, res) => {
  const sqlStatement = "SELECT * FROM category";
  db.query(sqlStatement, (err, result) => {
    res.send(result);
  });
});

module.exports = categoriesRouter;
