const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 3001;
const newsRouter = require("./routers/newsRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const userRouter = require("./routers/userRouter");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const corsConfig = {
  origin: [
    "http://localhost:3000",
    "https://grand-nasturtium-b81bfe.netlify.app",
    "https://peaceful-arithmetic-6cc738.netlify.app"
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH' , 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    message: "Data Ready And server Also",
  });
});

app.get("/check-session", (req, res) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!authHeader || !token)
    return res.status(401).send("Token does not exist");
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    if (decoded) {
      res.send(decoded);
    }
  } catch (error) {
    return res.status(403).send(error);
  }
});

app.use("/news/", newsRouter);

app.use("/categories/", categoriesRouter);

app.use("/user/", userRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(process.env.MYSQL_DB_HOST);
  console.log(`Example app listening on port ${PORT}`);
});
