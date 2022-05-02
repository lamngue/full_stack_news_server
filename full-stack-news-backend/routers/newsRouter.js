const express = require("express");
const dayjs = require("dayjs");
const newsRouter = express.Router();
const db = require("../db/db");
require("cookie-parser");
const verifyToken = require("../middleware/auth");
const { encodeHTML, decodeHTML } = require("../utils/utils");

newsRouter.use(verifyToken);

newsRouter.get("/:type", async (req, res) => {
  let { page, size } = req.query;
  const { type } = req.params;
  const pool = db.promise();
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
  try {
    const [rows, fields] = await pool.query(sqlStatement);
    const totalLength = rows.length;
    if (size && page) {
      const start = (page - 1) * size;
      const paginate = result.slice(start, start + size);
      rows = paginate;
    }
    res.json({
      totalLength,
      result: rows,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create a news
newsRouter.post("/", async (req, res) => {
  const { title, category, content } = req.body;
  const created_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const updated_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const encodedHTML = encodeHTML(content);
  const pool = db.promise();
  const insertNews =
    "INSERT INTO news (title, content, created_date, updated_date) VALUES (?, ?, ?, ?)";
  try {
    const [rows, fields] = await pool.query(insertNews, [
      title,
      encodedHTML,
      created_date,
      updated_date,
    ]);
    const insertID = rows.insertId;
    for (let i = 0; i < category.length; i++) {
      const getCatID = "SELECT * FROM category WHERE ID = ?";
      const [rows, fields] = await pool.query(getCatID, category[i]);
      const catID = rows[0].ID;
      const insertMapping =
        "INSERT INTO category_news_mapping (newsID, categoryID) VALUES (?, ?)";
      [rows, fields] = await pool.query(insertMapping, [insertID, catID]);
    }
  } catch (err) {
    res.status(403).send("Error creating News");
  }
});

//Update/edit a news
newsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, category, content } = req.body;
  const updated_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const encodedHTML = encodeHTML(content);
  const pool = db.promise();
  const updateNews =
    "UPDATE news SET title = ?, content = ?, updated_date = ? WHERE ID = ?";
  try {
    let [rows, fields] = await pool.query(updateNews, [
      title,
      encodedHTML,
      updated_date,
      id,
    ]);
    for (let i = 0; i < category.length; i++) {
      const getCatID = "SELECT * FROM category WHERE ID = ?";
      [rows, fields] = await pool.query(getCatID, category[i]);
      const catID = rows[0].ID;
      //Delete all old relations and re-insert new ones
      const deleteMapping =
        "DELETE FROM category_news_mapping WHERE newsID = ?";
      [rows, fields] = await pool.query(deleteMapping, [id]);
      const insertMapping =
        "INSERT INTO category_news_mapping (newsID, categoryID) VALUES (?, ?)";
      [rows, fields] = await pool.query(insertMapping, [id, catID]);
    }
  } catch (err) {
    res.status(403).send("Error editing News");
  }
});

//Delete a news
newsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const pool = db.promise();
  const deleteNews = "DELETE FROM news WHERE ID = ?";
  const deleteRelation = "DELETE FROM category_news_mapping where newsID = ?";
  try {
    let [rows, fields] = await pool.query(deleteRelation, [id]);
    [rows, fields] = await pool.query(deleteNews, [id]);
    res.send(id);
  } catch (err) {
    res.status(403).send("Error deleting News");
  }
});

//View a news
newsRouter.get("/detail/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const getNewsStatement = "SELECT * FROM news WHERE ID = ?";
  const getCategoryStatement =
    "SELECT * FROM category_news_mapping WHERE newsID = ?";
  const pool = db.promise();
  try {
    let [rows, fields] = await pool.query(getNewsStatement, [id]);
    const newsDetail = rows[0];
    [rows, fields] = await pool.query(getCategoryStatement, [id]);
    const resp = {
      ...newsDetail,
      content: decodeHTML(newsDetail.content),
      categoryIds: rows.map((i) => i.categoryID),
    };
    res.send(resp);
  } catch (err) {
    res.send(403).status("Error viewing News");
  }
});

module.exports = newsRouter;
