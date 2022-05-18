const pool = require("../../models/dbconnection");
var async = require("async");
// var Enquiry = require("../../models/schema/enquiry");
// var Users = require("../../models/schema/user");
// var Customer = require('../../models/schema/customer');
const moment = require('moment-timezone');

module.exports = {
  setCustomerFeedback: (data) => {
return new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return reject(err);
    }
    var query = "INSERT INTO `luftekin_luftapp`.`customerFeedback` SET ?";
    var values = data;
    connection.query(query, values, (error, result1, fields) => {
      if (error) {
        connection.release();
        return reject(error);
      }
      var results = [result1];
      connection.release();
      return resolve(results);
    })
  })
})
  }
  
};
