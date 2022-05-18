var express = require('express');
var router = express.Router();
var async = require("async");
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

router.route('/').get(getRouteHandler);

function getRouteHandler(req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    var enquiriesList = "SELECT * FROM `enquiries`";
    var salesErList = "SELECT * FROM luftekin_luftapp.users";
    var customerList = "SELECT * FROM luftekin_luftapp.customers;";
    // var query3 = 'SELECT id,Code,Name,Unit,Item_Group,Brand FROM luftekin_luftapp.item_master;';
    async.parallel(
      [
        (callback) => connection.query(enquiriesList, callback),
        (callback) => connection.query(salesErList, callback),
        (callback) => connection.query(customerList, callback),
      ],
      (error, results, fields) => {
        if (error) {
          resultsNotFound.errorMessage = "Data loading Error";
          resultsNotFound.rowCount = results.length;
          return res.send(resultsNotFound);
        }
        if (results == "") {
          resultsNotFound.errorMessage = "No Data Found";
          return res.send(resultsNotFound);
        } else {
          var enquiriesData = results[0][0];
          var userData = results[1][0];
          var customerData = results[2][0];
          // console.log(salesErData);
          for (let index = 0; index < enquiriesData.length; index++) {
            var fnSales = userData.filter(
              (item) => item.id == enquiriesData[index].salesEr
            )[0].firstname;
            var lnSales = userData.filter(
              (item) => item.id == enquiriesData[index].salesEr
            )[0].lastname;
            var fnApp = userData.filter(
              (item) => item.id == enquiriesData[index].appEr
            )[0].firstname;
            var lnApp = userData.filter(
              (item) => item.id == enquiriesData[index].appEr
            )[0].lastname;
            var customerName = customerData.filter(
              (item) => item.id == enquiriesData[index].customerId
            )[0].name;
            enquiriesData[index].customerName = customerName;
            enquiriesData[index].salesErName = fnSales + " " + lnSales;
            enquiriesData[index].appErName = fnApp + " " + lnApp;
          }
          res.send({
            rowCount: enquiriesData.length,
            data: enquiriesData,
            // SOItems: results[1][0],
            // IMaster: results[2][0]
          });
        }
      }
    );
  });

}

module.exports = router;