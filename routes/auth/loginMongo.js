
var async = require("async");
var express = require('express');
var router = express.Router();
var pool = require('../../models/dbconnection');
const jwt = require('jsonwebtoken');
const User = require("../../models/schema/user");

var resultsNotFound = {
    errorCode : 0 ,
    errorMessage : 'Operation not successful.',
    rowCount : Number,
    data: ''
  }
  
  var resultsFound = {
    errorCode : 1 ,
    errorMessage : 'Operation successful.',
    rowCount : Number,
    data: ''
  }

router.route('/login').post(postRouteHandler);

function getRouteHandler(req, res) {
    //handle GET route here
}

function postRouteHandler(req, res) {
  User.find({username: req.body.username}, (error, result) => {
    if(error){
      resultsNotFound.errorMessage = "Something went wrong with the server";
      return res.send(resultsNotFound);
    }
    if (result == "") {
      resultsNotFound.errorMessage =
        "User is not available. Please contact admin!";
      return res.send(resultsNotFound);
    }
    if (req.body.password == result[0].password) {
      var token = {
        token: jwt.sign(
          { email: result[0].username, userData: result[0] },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        ),
      };
      resultsFound["data"] = token;
      
      res.send(resultsFound);
    } else {
      resultsNotFound.errorMessage = "Incorrect Password";
      return res.send(resultsNotFound);
    }

  });
}

module.exports = router;
  
  