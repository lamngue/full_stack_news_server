const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 3001;
const newsRouter = require("./routers/newsRouter");
const categoriesRouter = require("./routers/categoriesRouter");

const corsConfig = {
  origin: [
    "http://localhost:3000",
    "https://6263ff2bcbf68433c2aff5c8--grand-nasturtium-b81bfe.netlify.app",
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

app.use("/categories/", categoriesRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
