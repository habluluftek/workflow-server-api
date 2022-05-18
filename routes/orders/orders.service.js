const pool = require("../../models/dbconnection");
// const mongoose = require("mongoose");
var async = require("async");
// var Job = require("../../models/schema/job");
// var Users = require("../../models/schema/user");
// var autoIncrement = require('mongoose-auto-increment');
// var Customer = require('../../models/schema/customer');
// autoIncrement.initialize(mongoose.connection);
var status = require('../../data/options/status.json');
var dbx = require('../../models/dropbox');
var fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  getList: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        var orderList = "SELECT * FROM `saleOrder`";
        var orderItemList = "SELECT * FROM `saleOrderItems`";
        var productList = "SELECT * FROM luftekin_luftapp.productList;";
        var userList = "SELECT * FROM luftekin_luftapp.users";
        var customerList = "SELECT * FROM luftekin_luftapp.customers;";
        var dispatches = "SELECT * FROM luftekin_luftapp.dispatches;";
        var payments = "SELECT * FROM luftekin_luftapp.payment;";
        var currency = "SELECT * FROM luftekin_luftapp.currency;";
        // var query3 = 'SELECT id,Code,Name,Unit,Item_Group,Brand FROM luftekin_luftapp.item_master;';
        async.parallel(
          [
            (callback) => connection.query(orderList, callback), //0 - orderlist
            (callback) => connection.query(orderItemList, callback), //1 - items
            (callback) => connection.query(productList, callback), //2 - products
            (callback) => connection.query(userList, callback), //3 - userList
            (callback) => connection.query(customerList, callback), //4 - customerList
            (callback) => connection.query(dispatches, callback), //5 - dispatched
            (callback) => connection.query(payments, callback), //6 - payments
            (callback) => connection.query(currency, callback), //7 - currency
          ],
          (error, results) => {
            if (error) {
              connection.release();
              return reject(error);
            } else {
              connection.release();
              return resolve(results);
            }
          }
        );
      });
    })
  },
  // getListMongo: () => {
  //   return new Promise((resolve, reject) => {
  //     async.parallel([
  //       (callback) => Job.find(callback)
  //     ], (error, results) => {
  //       if (error) {
  //         return reject(error);
  //       }
  //       return resolve(results);
  //     })
  //   })
  // },
  getDetails: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) throw err;
        var query1 = "SELECT * FROM `saleOrder` where soNum = " + id + ";";
        var orderItemList = "SELECT * FROM `saleOrderItems` where soNum = " + id + ";";
        var productList = "SELECT * FROM luftekin_luftapp.productList;";
        var userList = "SELECT * FROM luftekin_luftapp.users";
        var customerList = "SELECT * FROM luftekin_luftapp.customers;";
        var dispatches = "SELECT * FROM luftekin_luftapp.dispatches where soNum = " + id + ";";
        var payments = "SELECT * FROM luftekin_luftapp.payment where soNum = " + id + ";";
        var freights = "SELECT * FROM luftekin_luftapp.freights;";
        var currency = "SELECT * FROM luftekin_luftapp.currency;";

        async.parallel(
          [
            (callback) => connection.query(query1, callback),
            (callback) => connection.query(orderItemList, callback),
            (callback) => connection.query(productList, callback),
            (callback) => connection.query(userList, callback),
            (callback) => connection.query(customerList, callback),
            (callback) => connection.query(dispatches, callback),
            (callback) => connection.query(payments, callback), //6 - payments
            (callback) => connection.query(freights, callback), //7 - freight
            (callback) => connection.query(currency, callback), //8 - currency
          ],
          (err, results) => {
            if (err) {
              connection.release();
              return reject(err);
            } else {
              connection.release();
              return resolve(results);
            }
          });
      })
    })
  },

  getFiles: (id) => {
    return new Promise((resolve, reject) => {
      dbx.filesListFolder({
          path: "/jobs/" + id,

        })
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error);
        });
    })
  },
  fileUpload: (file) => {
    return new Promise((resolve, reject) => {

      // dbx.filesUpload({
      //   path:""
      // })
    })
  },
  // getDetailsMongo: (id) => {
  //   console.log(id);
  //   return new Promise((resolve, reject) => {
  //     async.parallel([
  //       (callback) => Job.findById(id, callback)
  //     ], (error, results) => {
  //       if (error) {
  //         return reject(error);
  //       }
  //       return resolve(results);
  //     })
  //     // pool.getConnection(function (err, connection) {
  //     //   if (err) throw err;
  //     //   var query1 = 'SELECT * FROM `users` where id = ' + id + ';';

  //     //   async.parallel(
  //     //     [
  //     //       (callback) => connection.query(query1, callback),
  //     //     ],
  //     //     (err, results) => {
  //     //       if (err) {
  //     //         return reject(err);
  //     //       }
  //     //       return resolve(results);
  //     //     });
  //     // })
  //   })
  // },
  setOrder: (data) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        var query = "INSERT INTO `saleOrder` SET ?";
        var _status = status.filter(i => i.id == 3)[0];
        var values = {
          jobRef: data[0].jobRef,
          poNum: data[0].poNum,
          poDate: moment(data[0].poDate).tz("Asia/Kolkata").format('YYYY-MM-DD'),
          customerId: data[0].customerId,
          projectName: data[0].projectName,
          siteAddress: data[0].siteAddress,
          country: data[0].country,
          state: data[0].state,
          city: data[0].city,
          currency: data[0].currency,
          freightScope: data[0].freightScope,
          freightCharge: data[0].freightCharge,
          installationScope: 1,
          installationCharge: 1.5,
          paymentTerms: data[0].paymentTerms,
          salesEr: data[0].salesEr,
          created: moment(data[0].created).tz("Asia/Kolkata").format('YYYY-MM-DD'),
          createdby: data[0].createdby,
          status: _status.id,
          marginFactor: data[0].marginFactor
        };
        switch (values.freightScope) {
          case 1:
            values.freightCharge = 1.5
            break;
          case 2:
            values.freightCharge = 0
            break;
        }

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
  },
  updateOrder: (data) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err1)
        } else {
          var query = `UPDATE luftekin_luftapp.saleOrder SET jobRef= ${data.jobRef},poNum= '${data.poNum}',
        poDate = '${moment(data.poDate).tz("Asia/Kolkata").format('YYYY-MM-DD')}',
        customerId= ${data.customerId},
        projectName= '${data.projectName}',
        siteAddress= '${data.siteAddress}',
        country= '${data.country}',
        state= '${data.state}',
        city= '${data.city}',
        currency= ${data.currency},
        freightScope= ${data.freightScope},
        freightCharge= ${data.freightCharge},
        paymentTerms= '${data.paymentTerms}',
        salesEr= ${data.salesEr},
        updated = '${moment(data.updated).tz("Asia/Kolkata").format('YYYY-MM-DD')}',
        updatedby= ${data.updatedby}
         WHERE (soNum = '${data.soNum}');`
          connection.query(query, (err1, results) => {
            if (err1) {
              reject(err1)
            } else {
              resolve(results)
            }
          })
        }
      })
    })




  },
  setFile: (data) => {
    return new Promise((resolve, reject) => {
      var id = data.insertId;
      console.log(id);
      dbx.filesCreateFolderV2({
          path: `/jobs/${id}`,
          autorename: true
        })
        .then(res => {
          return resolve(res);
        })
        .catch(error => {
          return reject(error);
        })
    })
  },
  downloadFile: (data) => {
    return new Promise((resolve, reject) => {
      dbx.filesDownload({
          path: data.path_lower
        })
        .then(res => {
          return resolve(res);
        })
        .catch(error => {
          return reject(error);
        })
    })
  },
  uploadFile: (data) => {
    return new Promise((resolve, reject) => {
      var _file = (data.file).split('\\');
      var file = _file[_file.length - 1];


      function string2Bin(str) {
        var result = [];
        for (var i = 0; i < str.length; i++) {
          result.push(str.charCodeAt(i).toString(2));
        }
        return result;
      }

      function bin2String(array) {
        var result = "";
        for (var i = 0; i < array.length; i++) {
          result += String.fromCharCode(parseInt(array[i], 2));
        }
        return result;
      }

      var s = bin2String(["01100110", "01101111", "01101111"]);
      var x = string2Bin('Hablu');
      console.log(s, x);
      // fs.readFileSync(data.file);
      // console.log(`/jobs/${data.id}/${file}`, data.data.data);
      dbx.filesUpload({
          contents: s,
          path: `/jobs/${data.id}/${file}`,
          mode: {
            ".tag": "add"
          }
        })
        .then(res => {
          return resolve(res);
        })
        .catch(error => {
          return reject(error);
        })
    })
  },
  setOrderMongo: (data) => {
    return new Promise((resolve, reject) => {
      let userData
      let salesErData
      let customerData
      async.parallel([
        (callback) => Users.find(callback),
        (callback) => Customer.find(callback),
      ], (err, res) => {
        salesErData = res[0]?.filter(i =>
          i.id === data[0].salesEr
        )[0];
        customerData = res[1]?.filter(i => i.id === data[0].customerId)[0];
        console.log(data[0]);
        const order = new Job({
          jobRef: data[0].jobRef,
          customer: customerData,
          projectName: data[0].projectName,
          poNum: data[0].poNum,
          poDate: data[0].poDate,
          freightScope: data[0].freightScope,
          freightCharge: data[0].freightCharge,
          paymentTerms: data[0].paymentTerms,
          salesEr: salesErData,
          created: data[0].created
        })
        // console.log(order);
        order.save((error, results) => {
          if (error) {
            return reject(error)
          }
          return resolve(results)
        })
      })
    })
  },
  setOrderItem: (data) => {
    return new Promise((resolve, reject) => {
      data.status = 4;
      data.amendmentNo = 0;
      var query = "INSERT INTO `saleOrderItems` SET ?";
      pool.getConnection((err, connection) => {
        connection.query(query, data, (err, results) => {
          if (err) {
            connection.release();
            return reject(err)
          }
          connection.release();
          return resolve(results)
        })
      })
    })
  },
  setOrderItemUpload: (data) => {
    return new Promise((resolve, reject) => {
      let output = []
      var query = "INSERT INTO `saleOrderItems` SET ?";
      var updateOrderStatus = "UPDATE saleOrder SET status = '4' WHERE(soNum = '" + data[0].soNum + "');"
      console.log(updateOrderStatus);
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err)
        } else {
          connection.query(updateOrderStatus, (err1, results1) => {
            if (err1) {
              connection.release();
              reject(err1)
            } else {
              data.forEach(i => {
                connection.query(query, i, (err2, results) => {
                  if (err2) {
                    connection.release();
                    return reject(err2)
                  } else {
                    // connection.release();
                    return resolve(results)
                  }
                })
              });
            }

          });
        }
      })
    })
  },
  setEstimatedCost: (data) => {
    return new Promise((resolve, reject) => {
      let query = []
      data.estimatedCost.forEach(e => {
        var q = "UPDATE `luftekin_luftapp`.`saleOrderItems` SET "
        q += "`listPrice` = '" + e.rate + "', "
        q += "`updated` = '" + data.updated + "', "
        q += "`updatedby` = '" + data.updatedby + "' "
        q += "WHERE (`id` = '" + e.itemId + "');"
        query.push(q)
      })
      pool.getConnection((err0, connection) => {
        query.forEach(e => {
          connection.query(e, (err, results) => {
            if (err) {
              connection.release();
              return reject(err)
            } else {
              connection.release();
              return resolve(results)
            }
          })
        })
      })
    })
  },
  setListPrice: (data) => {
    return new Promise((resolve, reject) => {
      let query = []
      data.forEach(e => {
        var q = "UPDATE `luftekin_luftapp`.`saleOrderItems` SET "
        q += "`listPrice` = '" + e.rate + "', "
        q += "`updated` = '" + data.updated + "', "
        q += "`updatedby` = '" + data.updatedby + "' "
        q += "WHERE (`id` = '" + e.itemId + "');"
        query.push(q)
      })
      pool.getConnection((err0, connection) => {
        query.forEach(e => {
          connection.query(e, (err, results) => {
            if (err) {
              connection.release();
              return reject(err)
            } else {
              connection.release();
              return resolve(results);
            }
          })
        })
      })
    })
  },
  setActualCost: (data) => {
    return new Promise((resolve, reject) => {
      let query = [];
      console.log(data);
      data.forEach(e => {
        var q = "UPDATE `luftekin_luftapp`.`saleOrderItems` SET "
        q += "`actualProductionCost` = '" + e.rate + "', "
        q += "`updated` = '" + data.updated + "', "
        q += "`updatedby` = '" + data.updatedby + "' "
        q += "WHERE (`id` = '" + e.itemId + "');"
        query.push(q)
      })
      pool.getConnection((err0, connection) => {
        query.forEach(e => {
          connection.query(e, (err, results) => {
            if (err) {
              connection.release();
              return reject(err);
            } else {
              connection.release();
              return resolve(results);
            }
          })
        })
      })
    })
  },
  setInstallationCost: (data) => {
    return new Promise((resolve, reject) => {
      let query = [];
      console.log(data);
      data.forEach(e => {
        var q = "UPDATE `luftekin_luftapp`.`saleOrderItems` SET "
        q += "`installationCharge` = '" + e.rate + "', "
        q += "`updated` = '" + data.updated + "', "
        q += "`updatedby` = '" + data.updatedby + "' "
        q += "WHERE (`id` = '" + e.itemId + "');"
        query.push(q)
      })
      pool.getConnection((err0, connection) => {
        if (err0) {
          return reject(err0)
        } else {
          query.forEach(e => {
            connection.query(e, (err, results) => {
              if (err) {
                connection.release();
                return reject(err)
              } else {
                connection.release();
                return resolve(results);
              }
            })
          })
        }
      })
    })
  },
  setDispatch: (data) => {
    return new Promise((resolve, reject) => {
      var query = "INSERT INTO `luftekin_luftapp`.`dispatches`(`soNum`, `itemIds`, `qty`, `freightDetails`, `freightCharge`, `actualDispatchDate`, `created`, `createdby`)"
      query += `VALUES('${data.soNum}', '${data.itemIds}', '${data.qty}', '${data.freightDetails}', '${data.freightCharge}', '${data.actualDispatchDate}', '${data.created}', '${data.createdby}')`;
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        } else {
          connection.query(query, (err1, res) => {
            if (err1) {
              connection.release();
              return reject(err1);
            } else {
              connection.release();
              return resolve(res);
            }
          })
        }
      })
    })
  },

  // insertItems: (id, data) => {

  //   return new Promise((resolve, reject) => {

  //     const items = new Job({
  //       // items: 
  //     })
  //     Job.updateOne({
  //         _id: id
  //       }, items)
  //       .then((results) => {
  //         return resolve(results);
  //       })
  //       .catch((error) => {
  //         return reject(error);
  //       })
  //   })
  // },

  updateEnquiry: (data) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        var query = "UPDATE `luftekin_luftapp`.`enquiries` SET "
        query += "`jobRef` = '" + data[0].jobRef + "',"
        query += " `projectName` = '" + data[0].projectname + "',"
        query += " `customerId` = '" + data[0].customerId + "',"
        query += " `quoteDate` = '" + data[0].quoteDate + "',"
        query += " `productDesc` = '" + data[0].productdesc + "',"
        query += " `qty` = '" + data[0].qty + "',"
        query += " `value` = '" + data[0].value + "',"
        query += " `updated` = '" + data[0].updated + "',"
        query += " `updatedby` = '" + data[0].updatedby + "',"
        query += " `location` = '" + data[0].location + "',"
        query += " `salesEr` = '" + data[0].salesEr + "',"
        query += " `appEr` = '" + data[0].appEr + "'"
        query += " WHERE (`id` = '" + data[0].id + "');"

        var values = data[0];
        connection.query(query, values, (error, result1, fields) => {

          console.log(query, values);
          if (error) {
            connection.release();
            return reject(error);
          } else {
            var results = [result1];
            connection.release();
            return resolve(results);
          }
        })
      })
    })
  },

  setPPCApproved: (id) => {
    return new Promise((resolve, reject) => {
      var query = `UPDATE luftekin_luftapp.saleOrder SET status = '5' WHERE soNum = '${id}';`
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err)
        } else {
          connection.query(query, (err1, result1) => {
            if (err1) {
              connection.release();
              return reject(err1)
            } else {
              connection.release();
              return resolve(result1)
            }
          })
        }
      });
    });
  },

  sendProductionPlan: (data) => {
    return new Promise((resolve, reject) => {
      var querySO = "UPDATE `luftekin_luftapp`.`saleOrder` SET `status` = '" + 6 + "' WHERE (`soNum` = '" + data.so.soNum + "');";
      let queryArr = []
      data.items.forEach(e => {
        var q = "UPDATE `luftekin_luftapp`.`saleOrderItems` SET "
        q += "`status` = '" + 6 + "' "
        q += "WHERE (`id` = '" + e.id + "');"
        queryArr.push(q);
      })
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err)
        }
        connection.query(querySO, (err1, results1) => {
          if (err1) {
            connection.release();
            return reject(err1)
          } else {
            queryArr.forEach(e => {
              connection.query(e, (err2, results2) => {
                if (err2) {
                  connection.release();
                  return reject(err2)
                } else {
                  connection.release();
                  var results = {
                    results1,
                    results2
                  };
                  return resolve(results);
                }
              })
            })
          }
        })
      })
    })
  },


  sendForPPC: (id) => {
    return new Promise((resolve, reject) => {
      var querySO = "UPDATE luftekin_luftapp.saleOrder SET status = '6' WHERE (soNum = '" + id + "');";
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err)
        } else {
          connection.query(querySO, (err1, result) => {
            if (err1) {
              connection.release();
              return reject(err1);
            } else {
              connection.release();
              return resolve(result)
            }
          })
        }
      });
    });
  },

  query: () => {
    return new Promise((resolve, reject) => {
      // var query = 'SELECT * FROM luftekin_luftapp.bomMenuData;'
      var enquiriesList = "SELECT * FROM `enquiries`";
      pool.getConnection((err, connection) => {
        async.parallel([
          (callback) => connection.query(enquiriesList, callback),
          (callback) => Users.find(callback),
          (callback) => Customer.find(callback),
        ], (error, results) => {
          if (error) {
            connection.release();
            return reject(error)
          }
          connection.release();
          return resolve(results)
        })
      })
    })
  },

  searchBilling: () => {
    return new Promise((resolve, reject) => {
      // var query0 = `SELECT a.id, a.soNum, a.rate, a.qty, (a.rate * a.qty) as value, b.poDate , b.salesEr, CONCAT(c.firstname," " ,c.lastname) AS salesErName from luftekin_luftapp.saleOrderItems a INNER JOIN saleOrder b ON a.soNum = b.soNum INNER JOIN users c ON b.salesEr = c.id;`;
      var query1 = `SELECT * FROM luftekin_luftapp.dispatches;`;
      var query2 = `SELECT * FROM luftekin_luftapp.saleOrderItems;`;
      var query3 = `SELECT a.soNum, a.jobRef, a.poDate, a.customerId, a.projectName, a.customerId, b.name as customerName, a.freightCharge, a.installationCharge, a.marginFactor, a.salesEr, CONCAT (c.firstname, " ", c.lastname) as salesErName FROM luftekin_luftapp.saleOrder a INNER JOIN luftekin_luftapp.customers b ON a.customerId = b.id INNER JOIN luftekin_luftapp.users c ON a.salesEr = c.id;`;
      pool.getConnection((err0, connection) => {
        if (err0) {
          return reject(err0)
        }
        async.parallel([
          // (cb) => connection.query(query0, cb),
          (cb) => connection.query(query1, cb),
          (cb) => connection.query(query2, cb),
          (cb) => connection.query(query3, cb),
        ], (err1, result) => {
          if (err1) {
            connection.release();
            return reject(err1)
          }
          connection.release();
          return resolve(result)
        })
      })
    })
  }

};