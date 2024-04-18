const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const app = express();
const db = require("./api/Database/db")

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
db.connect(function (error) {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log("Database Connected");
  }
});

const userRoutes = require("./api/routes/user")
const contactRoutes = require("./api/routes/contacts")
app.use("/", userRoutes);
app.use("/", contactRoutes);

module.exports = app;
