const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const db = require("../Database/db");
const UUID = require("uuid");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

/*=======================================================
                        Login
=========================================================*/

router.post(
  "/login",
  [body("email").not().isEmpty(), body("secretKey").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0],
      });
    }

    let sql = "SELECT * FROM user WHERE email=" + '"' + req.body.email + '"';

    db.query(sql, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        const data = result[0];
        if (data) {
          bcrypt.compare(
            req.body.secretKey,
            data.secretKey,
            (error, result) => {
              if (error) {
                return res.status(401).json(error);
              }
              if (result === true) {
                let token = jwt.sign({ email: data.email }, "secret", {
                  expiresIn: "90d",
                });

                return res.status(200).json({
                  status: 200,
                  email: data.email,
                  name: data.firstName + " " + data.lastName,
                  token,
                  role: data.roles,
                });
              } else if (result === false) {
                return res.status(401).json({ error: "Invalid secretKey" });
              } else {
                return res
                  .status(401)
                  .json({ error: "Please Enter valid credentials" });
              }
            }
          );
        } else {
          return res.status(401).json({ error: "Email Not Exist" });
        }
      }
    });
  })

/*=======================================================
                    Create User Data
=========================================================*/

router.post("/createUser", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.secretKey, 10);
  let {
    id,
    firstName,
    lastName,
    email,
    phoneNo,
  } = req.body;
  id = UUID.v4();

  const details = [
    id,
    firstName,
    lastName,
    email,
    phoneNo,
    hashedPassword,
  ];

  let sql = "INSERT INTO user VALUES (?,?,?,?,?,?)";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: error });
    } else {
      res.send({ status: true, message: "User created successfully" });
    }
  });
});

/*=======================================================
                  Get User Data by Email
=========================================================*/

router.get("/getUser/:email", (req, res) => {
  var useremail = req.params.email;
  var sql = "SELECT * FROM user WHERE email=" + '"' + useremail + '"';
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

/*=======================================================
                    Delete User
=========================================================*/

router.delete("/deleteUser/:id", (req, res) => {
  let sql = "DELETE FROM user WHERE id=" + req.params.id + "";
  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "User Deleted Failed" });
    } else {
      res.send({ status: true, message: "User Deleted successfully" });
    }
  });
});

module.exports = router;
