const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

conn.connect((err) => {
  if (err) {
    console.log("Connection database error!" + err);
  } else {
    console.log("Connection database success!");
  }
});

module.exports = conn;
