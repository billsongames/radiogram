const express = require("express");

const userRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId

userRoutes.route("/userID").get(function (req, res) {
  let db_connect = dbo.getDb("radioplayer")
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        throw err
      };
      res.json(result);
    });
});

module.exports = userRoutes