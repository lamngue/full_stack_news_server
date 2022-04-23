const express = require("express");
const dayjs = require("dayjs");
const newsRouter = express.Router();
const db = require("./db");
const { encodeHTML, decodeHTML } = require("./utils");

newsRouter.get("/:type", (req, res) => {
  const { type } = req.params;
  let sqlStatement;
  if (type === "undefined") {
    sqlStatement = "SELECT * FROM news";
  } else {
    sqlStatement = `SELECT title, content, created_date, updated_date 
      FROM news n 
      INNER JOIN category_news_mapping cn ON n.ID = cn.newsID
      INNER JOIN category c ON c.ID = cn.categoryID
      WHERE c.type = '${type}'`;
  }
  db.query(sqlStatement, (err, result) => {
    res.send(result);
  });
});

// Create a post
newsRouter.post("/", (req, res) => {
  const { title, category, content } = req.body;
  const created_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const updated_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const encodedHTML = encodeHTML(content);
  const insertNews =
    "INSERT INTO news (title, content, created_date, updated_date) VALUES (?, ?, ?, ?)";
  let ret;
  db.query(
    insertNews,
    [title, encodedHTML, created_date, updated_date],
    (err, result) => {
      // console.log("Inserted" + res.insertId);
      if (err) throw err;
      const insertID = result.insertId;
      for (let i = 0; i < category.length; i++) {
        const getCatID = "SELECT * FROM category WHERE type = ?";
        db.query(getCatID, category[i], (err, result) => {
          if (err) throw err;
          const catID = result[0].ID;
          const insertMapping =
            "INSERT INTO category_news_mapping (newsID, categoryID) VALUES (?, ?)";
          db.query(insertMapping, [insertID, catID], (err, result) => {
            if (err) throw err;
            ret = true;
          });
        });
      }
    }
  );

  res.json(ret);
});

newsRouter.get("/detail/:id", (req, res) => {
  const sqlStatement = "SELECT * FROM news WHERE ID = ?";
  const { id } = req.params;
  db.query(sqlStatement, [id], (err, result) => {
    if (err) throw err;
    const newsDetail = result[0];
    console.log({ ...newsDetail, content: decodeHTML(newsDetail.content) });
    res.send({ ...newsDetail, content: decodeHTML(newsDetail.content) });
  });
});

module.exports = newsRouter;
