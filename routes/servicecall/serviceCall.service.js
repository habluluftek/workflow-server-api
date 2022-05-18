const pool = require("../../models/dbconnection");
var async = require("async");
const PDFToolsSdk = require('@adobe/documentservices-pdftools-node-sdk');

var fs = require('fs');
var path = require('path');

// const credentials =  PDFToolsSdk.Credentials
//         .serviceAccountCredentialsBuilder()
//         .fromFile(path.join(__dirname, '../../models/pdftools-api-credentials.json'))
//         .build();

module.exports = {
  getList: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        var query1 = 'SELECT * FROM `serviceCall`';
        var query2 = 'SELECT * FROM `serviceCall_reviews`';
        var query3 = 'SELECT * FROM `serviceCall_troubles`';
        var salesErList = "SELECT * FROM luftekin_luftapp.users";
        var customerList = "SELECT * FROM luftekin_luftapp.customers;";
        var ahuPart = 'SELECT * FROM luftekin_luftapp.ahu_parts;'
        // var query3 = 'SELECT id,Code,Name,Unit,Item_Group,Brand FROM luftekin_luftapp.item_master;';
        async.parallel(
          [
            (callback) => connection.query(query1, callback),
            (callback) => connection.query(query2, callback),
            (callback) => connection.query(salesErList, callback),
            (callback) => connection.query(customerList, callback),
            (callback) => connection.query(query3, callback),
            (callback) => connection.query(ahuPart, callback),
          ], (error, results) => {
            try {
              return resolve(results)
            } catch {
              return reject(error);
            }
          }
        );
      });
    })
  },
  getDetails: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err,connection){
        if(err) throw err;
        var query1 = 'SELECT * FROM `serviceCall` where id = '+id+';';
        var salesErList = "SELECT * FROM luftekin_luftapp.users";
        var customerList = "SELECT * FROM luftekin_luftapp.customers;";
        var status = "SELECT * FROM luftekin_luftapp.serviceCall_status;";
    
        async.parallel(
          [
            (callback) => connection.query(query1, callback),
            (callback) => connection.query(salesErList, callback),
            (callback) => connection.query(customerList, callback),
            (callback) => connection.query(status, callback),
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
  getTroubles: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err,connection){
        if(err) throw err;
        var query3 = 'SELECT * FROM `serviceCall_troubles` where serviceCallId = '+id+';';
        var troubleList = "SELECT * FROM luftekin_luftapp.`trouble-list`;";
        var ahuPart = 'SELECT * FROM luftekin_luftapp.ahu_parts;'
    
        async.parallel(
          [
            (callback) => connection.query(query3, callback),
            (callback) => connection.query(troubleList, callback),
            (callback) => connection.query(ahuPart, callback),
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
  getLogs: (id) => {
      return new Promise((resolve, reject) => {
        pool.getConnection(function (err,connection){
          if(err) throw err;
          var feedbacks = 'SELECT * FROM `serviceCall_feedbacks` where serviceCallId = '+id+';';
          var reviews = 'SELECT * FROM `serviceCall_reviews` where serviceCallId = '+id+';';
          var salesErList = "SELECT * FROM luftekin_luftapp.users";
      
          async.parallel(
            [
              (callback) => connection.query(feedbacks, callback),
              (callback) => connection.query(reviews, callback),
              (callback) => connection.query(salesErList, callback),
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

  report: (id) =>{
    return new Promise((resolve, reject) => {
 pool.getConnection(function (err,connection){
        if(err) throw err;
        var query1 = 'SELECT * FROM `serviceCall` where id = '+id+';';
        var query2 = 'SELECT * FROM `serviceCall_troubles` where serviceCallId = '+id+';';
        var feedbacks = 'SELECT * FROM `serviceCall_feedbacks` where serviceCallId = '+id+';';
        var reviews = 'SELECT * FROM `serviceCall_reviews` where serviceCallId = '+id+';';
        var salesErList = "SELECT * FROM luftekin_luftapp.users";
        var customerList = "SELECT * FROM luftekin_luftapp.customers;";
        var status = "SELECT * FROM luftekin_luftapp.serviceCall_status;";
        var troubleList = "SELECT * FROM luftekin_luftapp.`trouble-list`;";
        var ahuPart = 'SELECT * FROM luftekin_luftapp.ahu_parts;'
    
        async.parallel(
          [
            (callback) => connection.query(query1, callback),
            (callback) => connection.query(query2, callback),
            (callback) => connection.query(feedbacks, callback),
            (callback) => connection.query(reviews, callback),
            (callback) => connection.query(salesErList, callback),
            (callback) => connection.query(customerList, callback),
            (callback) => connection.query(status, callback),
            (callback) => connection.query(troubleList, callback),
            (callback) => connection.query(ahuPart, callback),
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

  reportDownload: () => {
    return new Promise((resolve, reject) => {
      console.log('Hai');
      
    })
  },
  
  setCall: (data) => {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          // console.log(data);
          var query1 = "INSERT INTO `luftekin_luftapp`.`serviceCall` SET ?";
          var values = data.map(
            ({
              jobRef,
              regDate,
              soNum,
              mcTag,
              mcSerialNum,
              customerId,
              projectName,
              invoiceNum,
              salesEr,
              customerPersonName,
              customerPersonNo,
              createdby,
              callDesc,
              status,
            }) => ({
              jobRef,
              regDate,
              soNum,
              mcTag,
              mcSerialNum,
              customerId,
              projectName,
              invoiceNum,
              salesEr,
              customerPersonName,
              customerPersonNo,
              createdby,
              callDesc,
              status,
            })
          );
          var createdUser = "SELECT * FROM `users` where id = " + values[0].createdby + ";";
          var query2 = "SELECT * FROM `serviceCall` ORDER BY id DESC LIMIT 1;";
          var query3 = "INSERT INTO `serviceCall_troubles` SET ?";
          var feedback = "INSERT INTO `serviceCall_feedbacks` SET ?";
          var query4 =
            "SELECT * FROM luftekin_luftapp.users where department = 7  || designation = 3 || (department = 1 && designation=2) || (department = 1 && designation=6) || (department = 1 && designation=5);";
          // var query3 = 'SELECT id,Code,Name,Unit,Item_Group,Brand FROM luftekin_luftapp.item_master;';connection.query(query, values[0], function (error, results, fields) {
            connection.query(query1, values[0], (error, results1) => {
              connection.query(query2, function (error, results2, fields) {
                console.log(results2[0].id);
                var troubleValues = data[0].trouble;
                var feedbackValues = data[0].feedback;
                feedbackValues.serviceCallId = results2[0].id;
                for (i = 0; i < troubleValues.length; i++) {
                  troubleValues[i].serviceCallId = results2[0].id;
                }
                for (i = 0; i < troubleValues.length; i++) {
                  connection.query(query3,troubleValues[i],
                    (error, results3) => {
                      connection.query(feedback,feedbackValues,
                        (error, results4) => {
                          connection.query(createdUser,
                            (error, results5) => {
                              connection.query(query4,
                                (error, results6) => {
                                  if (err) {
                                    console.log(err);
                                    return reject(err);
                                  }
                                  var results = [results1,results2,results3,results4,results5,results6];
                                  return resolve(results);
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              });
            });
        });
      });
    },
  setComplaint: (data) => {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          // console.log(data);
          var query1 = "INSERT INTO `trouble-list` SET ?";
          var values = data
            connection.query(query1, values, (error, results1) => {
              if (err) {
                console.log(err);
                return reject(err);
              }
              var results = [results1];
              return resolve(results);});
        });
      });
  },
  setLog: (data) => {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          var value = data;
          let query1
          if (value[0].createdbyDepartment == 1) {
            query1 = "INSERT INTO `serviceCall_feedbacks` SET ?";
          } else {query1 = "INSERT INTO `serviceCall_reviews` SET ?";}
          var values = value.map(({serviceCallId,comment,createdby,date})=>({serviceCallId,comment,createdby,date}))
            connection.query(query1, values, (error, results1) => {
              if (err) {
                console.log(err);
                return reject(err);
              }
              var results = [results1];
              return resolve(results);});
        });
      });
  },
  setRespond: (data) => {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          var value = data[0];
          var values = data.map(({attnDate,attnby,complaintDesc,customerRemarks,status})=>({attnDate,attnby,complaintDesc,customerRemarks,status}))
          var query1 ="UPDATE `luftekin_luftapp`.`serviceCall` SET "
          query1 += "`attnDate` = '"+values[0].attnDate+"',"
          query1 += "`attnby` = '"+values[0].attnby+"',"
          query1 += "`complaintDesc` = '"+values[0].complaintDesc+"',"
          query1 += "`status` = '"+values[0].status+"',"
          query1 += "`customerRemarks` = '"+values[0].customerRemarks +"'"
          query1 += " WHERE (`id` = '"+value.review.serviceCallId+"');"
          var query2='INSERT INTO `luftekin_luftapp`.`serviceCall_reviews` SET ?'
          var reviewValues = value.review;
            connection.query(query1, (error, results1) => {
              connection.query(query2,reviewValues, function (error, results2, fields) {
                if (err) {
                  console.log(err);
                  return reject(err);
                }
                var results = [results1,results2];
                return resolve(results);});
              })
        });
      });
  },
  setComplete: (data) => {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          var value = data[0];
          var values = data.map(({completedDate,correction,status})=>({completedDate,correction,status}))
          var query1 ="UPDATE `luftekin_luftapp`.`serviceCall` SET "
          query1 += "`completedDate` = '"+values[0].completedDate+"',"
          query1 += "`correction` = '"+values[0].correction+"',"
          query1 += "`status` = '"+values[0].status +"'"
          query1 += " WHERE (`id` = '"+value.review.serviceCallId+"');"
          var query2='INSERT INTO `luftekin_luftapp`.`serviceCall_reviews` SET ?'
          var reviewValues = value.review;
          var query3 = "SELECT * FROM luftekin_luftapp.users where department = 7 || designation = 1 || designation = 3 || department = 1 ;";

            connection.query(query1, (error, results1) => {
              connection.query(query2,reviewValues, function (error, results2, fields) {
                connection.query(query3,function (error, results3, fields) {
                  if (err) {
                    console.log(err);
                    return reject(err);
                  }
                  var results = [results1,results2,results3,value.review.serviceCallId];
                  return resolve(results);});
                });
              });
        });
      });
  },
  dailyReport: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        var query1 = 'SELECT * FROM `serviceCall` where status = 1';
        var query2 = 'SELECT * FROM `serviceCall` where status = 2';
        var query3 = "SELECT * FROM luftekin_luftapp.users where department = 7 || designation = 3 || (department = 1 && designation=2) || (department = 1 && designation=6) || (department = 1 && designation=5);";

        async.parallel(
          [
            (callback) => connection.query(query1, callback),
            (callback) => connection.query(query2, callback),
            (callback) => connection.query(query3, callback),
          ], (error, results) => {
            try {
              return resolve(results)
            } catch {
              return reject(error);
            }
          }
        );
      });
    })
  },
  threeDailyReport: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        var query1 = 'SELECT * FROM `serviceCall` where status = 1';
        var query2 = 'SELECT * FROM `serviceCall` where status = 2';
        var query3 = "SELECT * FROM luftekin_luftapp.users where (designation = 1);";

        async.parallel(
          [
            (callback) => connection.query(query1, callback),
            (callback) => connection.query(query2, callback),
            (callback) => connection.query(query3, callback),
          ], (error, results) => {
            try {
              return resolve(results)
            } catch {
              return reject(error);
            }
          }
        );
      });
    })
  }
};
