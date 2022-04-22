const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;
const multiparty = require("connect-multiparty");
const MultipartyMiddleware = multiparty({ uploadDir: "./images" });
const newsRouter = require("./newsRouter");
const path = require("path");
const fs = require("fs");

const corsConfig = {
  origin: ["http://localhost:3000"],
  credentials: false,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/upload-image", MultipartyMiddleware, (req, res) => {
  const TempFile = req.files.upload;
  const TempPathfile = TempFile.path;

  const targetPathUrl = path.join(__dirname, "./uploads/" + TempFile.name);

  if (
    path.extname(TempFile.originalFilename).toLowerCase() === ".png" ||
    ".jpg"
  ) {
    fs.rename(TempPathfile, targetPathUrl, (err) => {
      res.status(200).json({
        uploaded: true,
        url: `${TempFile.originalFilename}`,
      });

      if (err) return console.log(err);
    });
  }
});

app.use("/news/", newsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
