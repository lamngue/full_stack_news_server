const express = require('express')

const categoryRouter = express.Router()

categoryRouter.get("/", (req, res) => {
    res.json("Category router")
  });

module.exports = categoryRouter