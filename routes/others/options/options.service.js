const pool = require("../../../models/dbconnection");
var async = require("async");

module.exports = {
  getList: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err,connection) =>{
        var ahuPart = "SELECT * FROM `ahu_parts`";
        var troubleList = "SELECT * FROM `trouble-list`";
        async.parallel(
          [
            (callback) => connection.query(ahuPart, callback),
            (callback) => connection.query(troubleList, callback),
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
    options: () => {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          var currency = "SELECT * FROM  luftekin_luftapp.currency";
          var freight = "SELECT * FROM luftekin_luftapp.freights;";
          var gstRate = "SELECT * FROM luftekin_luftapp.gstRates;";
          var productList = "SELECT * FROM luftekin_luftapp.productList;";
          async.parallel(
            [
              (callback) => connection.query(currency, callback),
                (callback) => connection.query(freight, callback),
                  (callback) => connection.query(gstRate, callback),
                    (callback) => connection.query(productList, callback),
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
      pool.getConnection(function (err,connection){
        if(err) throw err;
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
    getMarginFactor: () => {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          var ahuPart = "SELECT * FROM `salesFactor`";
          async.parallel(
            [
              (callback) => connection.query(ahuPart, callback),
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
};
