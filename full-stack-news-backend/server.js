const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3001
const categoryRouter = require('./categoryRouter')
const postRouter = require('./postRouter')

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

app.use('/news/', postRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})