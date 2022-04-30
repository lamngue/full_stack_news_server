const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 3001;
const newsRouter = require("./routers/newsRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const userRouter = require("./routers/userRouter");
require("dotenv").config();

const corsConfig = {
  origin: [
    "http://localhost:3000",
    "https://grand-nasturtium-b81bfe.netlify.app",
  ],
  credentials: false,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsConfig));
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    message: "Data Ready And server Also",
  });
});

app.use("/news/", newsRouter);

app.use("/categories/", categoriesRouter);

app.use("/user/", userRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(process.env.MYSQL_DB_HOST);
  console.log(`Example app listening on port ${PORT}`);
});
