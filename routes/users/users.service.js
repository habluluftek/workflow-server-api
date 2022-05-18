const pool = require("../../models/dbconnection");
var async = require("async");
const jwt = require('jsonwebtoken');
// const User = require("../../models/schema/user");

module.exports = {
  login: () => {

  },
  getList: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err,connection) =>{
        var query1 = "SELECT * FROM `users`";
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
  
  // getListMongo: () => {
  //   return new Promise((resolve, reject) => {
  //     async.parallel([
  //       (callback) => User.find(callback)
  //     ], (error,results) => {
  //       if (error) {
  //         console.log(error);
  //           return reject(error);
  //         }
  //         return resolve(results);
  //     });
  //   })
  //   },
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
