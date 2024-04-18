const express = require("express");
const router = express.Router();
const db = require("../Database/db");
const UUID = require("uuid");

/*=======================================================
                    Create User Data
=========================================================*/

router.post("/createContact", async (req, res) => {
  let {
    id,
    firstName,
    lastName,
    phoneNo,
  } = req.body;
  id = UUID.v4();

  const details = [
    id,
    firstName,
    lastName,
    phoneNo,
  ];

  let sql = "INSERT INTO contacts VALUES (?,?,?,?)";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: error });
    } else {
      res.send({ status: true, message: "Contact created successfully" });
    }
  });
});

/*=======================================================
                  Get Contact Data by Phone No
=========================================================*/

router.get("/getContact/:id", (req, res) => {
  var sql = "SELECT * FROM contacts WHERE id=" + '"' + req.params.id + '"';
  db.query(sql, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

/*=======================================================
                  Get Contact
=========================================================*/

router.get("/getContacts", (req, res) => {
  var sql = "SELECT * FROM contacts";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send(result);
    }
  });
});

/*=======================================================
                    Update Contact
=========================================================*/

router.put("/updateContact/:id", (req, res) => {
  console.log(req.params.id);
  const { firstName, lastName, phoneNo } = req.body;
  const sql = "UPDATE contacts SET firstName=?, lastName=?, phoneNo=? WHERE id=" + '"' + req.params.id + '"';
  db.query(sql, [firstName, lastName, phoneNo], (error) => {
    if (error) {
      res.status(500).send({ status: false, message: error });
    } else {
      res.status(200).send({ status: true, message: "Contact updated successfully" });
    }
  });
});

/*=======================================================
                    Delete Contact
=========================================================*/

router.delete("/deleteContact/:id", (req, res) => {
  let sql = "DELETE FROM contacts WHERE id=" + '"' + req.params.id + '"';
  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: error });
    } else {
      res.send({ status: true, message: "Contact Deleted successfully" });
    }
  });
});

module.exports = router;
