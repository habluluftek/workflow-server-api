const pool = require("../../models/dbconnection");
var async = require("async");

module.exports = {
  getList: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err,connection) =>{
        if(err) {return reject(err);}
        var query1 ="SELECT * FROM `customers`";
        var query2 = 'SELECT * FROM `customer_address`';
        var region = "SELECT * FROM luftekin_luftapp.region";
        async.parallel(
          [
            (callback) => connection.query(query1, callback),
            (callback) => connection.query(query2, callback),
            (callback) => connection.query(region, callback),
          ],
            (error, results) => {
          if (error) {
            connection.release();
            return reject(error);
          }
          connection.release();
          return resolve(results);
        }
      );
    });
    })
    },
  getDetails: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err0,connection){
        if(err0) {return reject(err0);}
        var query1 = 'SELECT * FROM `users` where id = '+id+';';
        async.parallel(
          [
            (callback) => connection.query(query1, callback),
          ],
          (err, results) => {
            if (err) {
              connection.release();
              return reject(err);
            }
            connection.release();
            return resolve(results);
          });
      })
    })
    },
  
  
  set: (data) => {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) throw err;
        var insertCustomer = "INSERT INTO `customers` SET ?";
        var values = {
          name: data.name,
          createdDate: data.createdDate,
          createdby: data.createdby
        };
        var insertCustomerAddress = "INSERT INTO `customer_address` SET ?";
        var query1 = "SELECT * FROM `customers`";
        var query2 = 'SELECT * FROM `customers` ORDER BY id DESC LIMIT 1;'
        connection.query(
          insertCustomer,
          values,
          (error, results1) => {
            connection.query(query2,
              (error, results2) => {
                var valuesRegion = {
                  customerId: results2[0].id,
                  salesEr: data.address.salesEr,
                  region: data.address.region
                };
                connection.query(insertCustomerAddress, valuesRegion,
                  (error, results3) => {
                    if (err) {
                      console.log(err);
                      return reject(err);
                    }
                    var results = [results1, results2, results3];
                    return resolve(results);
                  }
                );
              });
          }
        );
      })
    })
  },
};
