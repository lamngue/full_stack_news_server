const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000
const categoryRouter = require('./categoryRouter')
const viewPostRouter = require('./viewPostRouter')
const mysql = require('mysql')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'L4md3pz4i@',
  database: 'full_stack_news_project'
})

const corsConfig = {
  origin: ['http://localhost:3000'],
  credentials: false
}


app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Hello World");
})

app.use('/category/', categoryRouter)

app.post('/view-post/', viewPostRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})