const mysql = require("mysql");

const db = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "bfe52602091b67",
  password: "6c421365",
  database: "heroku_892e54a933fc690",
});

module.exports = db;
