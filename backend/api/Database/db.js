const mysql = require("mysql");
const data = require("../../../data/data")

const db = mysql.createConnection({
  host: data.HOST,
  user: data.USER,
  password: data.PASSWORD,
  database: data.DATABASE
});

module.exports = db;
