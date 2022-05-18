
var async = require("async");
var express = require('express');
var router = express.Router();
var pool = require('../../models/dbconnection');
const jwt = require('jsonwebtoken');

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

router.route('/setComplaint').post(postRouteHandler);

function getRouteHandler(req, res) {
    //handle GET route here
}

function postRouteHandler(req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    // console.log('REaching Connector');

    // bcrypt.hash(req.body.user_password, saltRounds, function (err, hash){
    var query = "INSERT INTO `enquiries` SET ?";
    var values = {
      job_ref_num: req.body.job_ref_num,
      quote_date: req.body.quote_date,
      customer_id: req.body.customer_id,
      project_name: req.body.project_name,
      location: req.body.location,
      product_desc: req.body.product_desc,
      qty: req.body.qty,
      value: req.body.value,
      sales_engg: req.body.sales_engg,
      app_engg: req.body.app_engg,
      created: new Date(),
      createdby: req.body.createdby,
    };

    connection.query(query, values, function (error, results, fields) {
      if (error) {
        // console.log('Failed Customer' + error);

        resultsNotFound.errorMessage = "Customer Already Exists.";
        return res.send(resultsNotFound);
      } else {
        return res.send(resultsFound);
      }
    });
    connection.release();
    if (err) throw err;
    // })
  });

  }

module.exports = router;
  
  