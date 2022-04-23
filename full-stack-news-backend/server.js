const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;
const multiparty = require("connect-multiparty");
const MultipartyMiddleware = multiparty({ uploadDir: "./uploads" });
const helmet = require("helmet");
const newsRouter = require("./newsRouter");
const path = require("path");
const fs = require("fs");

const corsConfig = {
  origin: ["http://localhost:3000"],
  credentials: false,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsConfig));
app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    message: "Data Ready And server Also",
  });
});

// app.post("/upload-image", MultipartyMiddleware, (req, res) => {
//   const TempFile = req.files.upload;
//   const TempPathfile = TempFile.path;

//   const targetPathUrl = path.join(__dirname, "./uploads/" + TempFile.name);

//   if (
//     path.extname(TempFile.originalFilename).toLowerCase() === ".png" ||
//     ".jpg"
//   ) {
//     fs.rename(TempPathfile, targetPathUrl, (err) => {
//       res.json({
//         uploaded: true,
//         url: `${TempFile.originalFilename}`,
//       });

//       if (err) return console.log(err);
//     });
//   }

//   console.log(req.files);
// });

app.use("/news/", newsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
