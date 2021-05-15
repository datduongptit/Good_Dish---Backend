const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const conn = require("./config/db");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  return res.send({ error: true, message: "hello" });
});

// GET data by table (category)
app.get("/api/dish", function (req, res) {
  const { table } = req.body;
  console.log(req.params);
  conn.query(`SELECT * FROM ${table}`, function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Get data successful",
    });
  });
});

// GET
// Search dish by category
app.get("/api/dish/category/search", function (req, res) {
  const { search } = req.body;
  console.log(search);
  conn.query(
    `SELECT * FROM tblchuyenmuc WHERE ten LIKE '${search}'`,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Get data successful",
      });
    }
  );
});

// GET dish by id
app.get("/api/dish/:id", function (req, res) {});

// GET
// GET dish by ID & category
app.get("/api/dish/category/:id", function (req, res) {
  let id = req.params.id;
  const table = req.body.table;
  conn.query(
    `SELECT * FROM ${table} WHERE id=?`,
    id,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Get data successful",
      });
    }
  );
});

// GET Search all dish by column = 'ten'
app.get("/api/searchAll", function (req, res) {
  const { search, table } = req.body;
  console.log(search);
  conn.query(
    `SELECT * FROM ${table} tbl WHERE ten LIKE '${search}'`,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Get data successful",
      });
    }
  );
});

app.listen(3000, function () {
  console.log("Nodejs app is running on port 3000");
});
