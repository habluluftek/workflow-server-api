const pool = require("../../models/dbconnection");
var async = require("async");
// var Enquiry = require("../../models/schema/enquiry");
// var Users = require("../../models/schema/user");
// var Customer = require('../../models/schema/customer');
const moment = require('moment-timezone');

module.exports = {
  getList: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
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
  // getListMongo: () => {
  //     return new Promise((resolve, reject) => {
  //       async.parallel([
  //         (callback) => Enquiry.find(callback)
  //       ], (error, results) => {
  //         if (error) {
  //           return reject(error);
  //         }
  //         return resolve(results);
  //       })
  //     })
  // },
  getDetails: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err0, connection) {
        if (err0) return reject(err);
        var query1 = 'SELECT * FROM `enquiries` where id = ' + id + ';';
        var salesErList = "SELECT * FROM luftekin_luftapp.users";
        async.parallel(
          [
            (callback) => connection.query(query1, callback),
              (callback) => connection.query(salesErList, callback),
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
  setEnquiry: (data) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if(err){return reject(err);}
        var query = "INSERT INTO `enquiries` SET ?";
        var values = data[0];
        console.log({
          receivedDate:values.receivedDate,
quoteDate: values.quoteDate
        });
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
  // setEnquiryMongo: (data) => {

  //   return new Promise((resolve, reject) => {
  //         let salesErData
  //         let appErData
  //         let customerData
  //         let createdData
  //         async.parallel([
  //           (callback) => Users.find(callback),
  //             (callback) => Customer.find(callback),
  //         ], (err, res) => {
  //           if (err) {
  //             return reject(err)
  //           }
  //           salesErData = res[0]?.filter(i => i.id === data[0].salesEr)[0];
  //           appErData = res[0]?.filter(i => i.id === data[0].appEr)[0];
  //           customerData = res[1]?.filter(i => i.id === data[0].customerId)[0];
  //           createdData = res[0]?.filter(i => i.id === data[0].createdby)[0];
  //           const enquiry = new Enquiry({
  //             jobRef : data[0].jobRef,
  //             customer: customerData,
  //             projectName: data[0].projectname,
  //             quoteDate: data[0].quoteDate,
  //             productDesc: data[0].productDesc,
  //             qty: data[0].qty,
  //             value: data[0].value,
  //             salesEr: salesErData,
  //             appEr: appErData,
  //             created: data[0].created,
  //             createdby: createdData
  //           })
  //           enquiry.save((error, result) => {
  //             if (error) {console.log(error); return reject(error)}
  //             return resolve(result)
  //           })

  //         })
  //   })
  // },
  
  updateEnquiry: (data) => {
console.log({
  receivedDate: data[0].receivedDate,
  quoteDate: data[0].quoteDate
});
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {return reject(err);}
        var query = "UPDATE `luftekin_luftapp`.`enquiries` SET "
        query += "`jobRef` = '"+data[0].jobRef+"',"
        query += " `projectName` = '"+data[0].projectname+"',"
        query += " `customerId` = '" + data[0].customerId + "',"
        query += " `receivedDate` = '" + moment(data[0].receivedDate).tz("Asia/Kolkata").format('YYYY-MM-DD') + "',"
        query += " `quoteDate` = '" + moment(data[0].quoteDate).tz("Asia/Kolkata").format('YYYY-MM-DD') + "',"
        query += " `productDesc` = '"+data[0].productdesc+"',"
        query += " `qty` = '"+data[0].Qty+"',"
        query += " `value` = '"+data[0].value+"',"
        query += " `updated` = '" + moment(data[0].updated).tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss') + "',"
        query += " `updatedby` = '"+data[0].updatedby+"',"
        query += " `location` = '"+data[0].location+"',"
        query += " `salesEr` = '"+data[0].salesEr+"',"
        query += " `appEr` = '"+data[0].appEr+"'"
        query += " WHERE (`id` = '"+data[0].id+"');"
        var values = data[0];
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

  search: (data) => {
    return new Promise((resolve, reject) => {
      var query = 'SELECT * '
      pool.getConnection((err, connection) => {
        connection.query()
      })
    })
  }
  
};
