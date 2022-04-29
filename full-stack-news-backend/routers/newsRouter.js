const express = require("express");
const dayjs = require("dayjs");
const newsRouter = express.Router();
const db = require("../db/db");
const { encodeHTML, decodeHTML } = require("../utils/utils");

newsRouter.get("/:type", (req, res) => {
  const { type } = req.params;
  let {page, size} = req.query;
  let sqlStatement;
  if (type === "undefined") {
    sqlStatement = "SELECT * FROM news";
  } else {
    sqlStatement = `SELECT n.ID, title, content, created_date, updated_date 
      FROM news n 
      INNER JOIN category_news_mapping cn ON n.ID = cn.newsID
      INNER JOIN category c ON c.ID = cn.categoryID
      WHERE c.type = '${type}'`;
  }
  db.query(sqlStatement, (err, result) => {
    if (err) throw err;
    const totalLength = result.length;
    if (size && page) {
      const start = (page - 1) * size;
      const paginate = result.slice(start, start + size);
      result = paginate;
    }
    res.json({
      totalLength,
      result
    });
  });
});

// Create a news
newsRouter.post("/", (req, res) => {
  const { title, category, content } = req.body;
  const created_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const updated_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const encodedHTML = encodeHTML(content);
  const insertNews =
    "INSERT INTO news (title, content, created_date, updated_date) VALUES (?, ?, ?, ?)";
  db.query(
    insertNews,
    [title, encodedHTML, created_date, updated_date],
    (err, result) => {
      if (err) throw err;
      const insertID = result.insertId;
      for (let i = 0; i < category.length; i++) {
        const getCatID = "SELECT * FROM category WHERE ID = ?";
        db.query(getCatID, category[i], (err, result) => {
          if (err) throw err;
          const catID = result[0].ID;
          const insertMapping =
            "INSERT INTO category_news_mapping (newsID, categoryID) VALUES (?, ?)";
          db.query(insertMapping, [insertID, catID], (err, result) => {
            if (err) throw err;
          });
        });
      }
    }
  );
});

//Update/edit a news
newsRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, category, content } = req.body;
  const updated_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const encodedHTML = encodeHTML(content);
  const updateNews =
    "UPDATE news SET title = ?, content = ?, updated_date = ? WHERE ID = ?";
  db.query(
    updateNews,
    [title, encodedHTML, updated_date, id],
    (err, result) => {
      if (err) throw err;
      for (let i = 0; i < category.length; i++) {
        const getCatID = "SELECT * FROM category WHERE ID = ?";
        db.query(getCatID, category[i], (err, result) => {
          if (err) throw err;
          const catID = result[0].ID;
          //Delete all old relations and insert new ones
          const deleteMapping =
            "DELETE FROM category_news_mapping WHERE newsID = ?";
          db.query(deleteMapping, [id], (err, result) => {
            if (err) throw err;
            const insertMapping =
              "INSERT INTO category_news_mapping (newsID, categoryID) VALUES (?, ?)";
            db.query(insertMapping, [id, catID], (err, result) => {
              if (err) throw err;
            });
          });
        });
      }
    }
  );
});

//Delete a news
newsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deleteNews = "DELETE FROM news WHERE ID = ?";
  const deleteRelation = "DELETE FROM category_news_mapping where newsID = ?";
  db.query(deleteRelation, [id], (err, result) => {
    if (err) throw err;
    db.query(deleteNews, [id], (err, result) => {
      if (err) throw err;
      res.send(id);
    });
  });
});

//View a news
newsRouter.get("/detail/:id", (req, res) => {
  const getNewsStatement = "SELECT * FROM news WHERE ID = ?";
  const getCategoryStatement =
    "SELECT * FROM category_news_mapping WHERE newsID = ?";
  const { id } = req.params;
  db.query(getNewsStatement, [id], (err, result) => {
    if (err) throw err;
    const newsDetail = result[0];

    db.query(getCategoryStatement, [id], (err, result) => {
      const resp = {
        ...newsDetail,
        content: decodeHTML(newsDetail.content),
        categoryIds: result.map((i) => i.categoryID),
      };
      res.send(resp);
    });
  });
});

module.exports = newsRouter;
