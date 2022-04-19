const express = require('express')
const viewPostRouter = express.Router()

viewPostRouter.get("/", (req, res) => {
    res.json("Get All post router")
});

viewPostRouter.get("/:id", (req, res) => {
  res.json("View Post router " + req.params.id)
})

module.exports = viewPostRouter