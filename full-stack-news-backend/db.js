const mysql = require('mysql')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'L4md3pz4i@',
  database: 'full_stack_news_project'
})

module.exports = db;