const pool = require("../../../models/dbconnection");
var async = require("async");

module.exports = {
  getList: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err,connection) =>{
        var query1 = "SELECT * FROM `region`";
          async.parallel(
            [
              (callback) => connection.query(query1, callback)
            ],(error, results) => {
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
};
