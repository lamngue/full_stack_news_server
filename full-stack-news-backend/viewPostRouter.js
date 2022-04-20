const express = require('express')
const postRouter = express.Router()

postRouter.get("/", (req, res) => {
    res.json("Get All post router")
});

postRouter.get("/:id", (req, res) => {
  res.json("View Post router " + req.params.id)
})

module.exports = postRouter