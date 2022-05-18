const pool = require("../../models/dbconnection");
// const pgclient = require("../../models/pgdbconn")
var async = require("async");

module.exports = {
  getList: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        var query1 = "SELECT * FROM `customers`";
        var query2 = 'SELECT * FROM `customer_address`';
        var query3 = 'SELECT * FROM `customer_rep`';
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
  // getListPG: () => {
  //   return new Promise((resolve, reject) => {
  //     pgclient.query(`SELECT * FROM "workflow"."customers";`, (error, results) => {
  //       console.log("QUUU")
  //       if (error) {
  //         return reject(error)
  //       }
  //       return resolve(results);
  //     })
  //   })
  // },
  getDetails: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) throw err;
        var query1 = 'SELECT * FROM `users` where id = ' + id + ';';

        async.parallel(
          [
            (callback) => connection.query(query1, callback),
          ],
          (err, results) => {
            if (err) {
              return reject(err);
            }
            return resolve(results);
          });
      })
    })
  },
  getCustomerFeedback: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        var query1 = "SELECT * FROM `customerFeedback`";
        async.parallel(
          [
            (callback) => connection.query(query1, callback),
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

  // setPGDB: (data) => {
  //   return new Promise((resolve, reject) => {
  //     var insertCustomer = `INSERT INTO "workflow"."customers" ("CustomerName","CustomerTypeID","RegionID","SalesErID","CreatedBy","UpdatedBy") VALUES ('${data.name}',1,${data.address.region},${data.address.salesEr},${data.createdby},${data.createdby}) returning "CustomerID"`;
  //     var values = [{
  //       CustomerName: data.name,
  //       RegionID: data.address.region,
  //       SalesErID: data.address.salesEr,
  //       CreatedBy: data.createdby,
  //       UpdatedBy: data.createdby,
  //     }];
  //     console.log(insertCustomer);
  //     pgclient.query(insertCustomer,(error, results) => {
  //       if (error) {
  //         console.log(error)
  //         reject(error)
  //       };
  //       resolve(results);
  //     })
  //   })
  // },

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