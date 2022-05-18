const pool = require("../../models/dbconnection");
var async = require("async");

module.exports = {
  getCoilPriceList: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        var query1 = "SELECT * FROM `enquiries`  where id = "+id+";";
        var query2 = "SELECT * FROM `coilPriceList`;";
        var query3 = "SELECT * FROM `coilTubes`;";
        var query4 = "SELECT * FROM `bomMenuData`;";
        var query5 = "SELECT * FROM `bomMenu`;";
        // var query3 = 'SELECT id,Code,Name,Unit,Item_Group,Brand FROM luftekin_luftapp.item_master;';
        async.parallel(
          [
            (callback) => connection.query(query1, callback),
            (callback) => connection.query(query2, callback),
            (callback) => connection.query(query3, callback),
            (callback) => connection.query(query4, callback),
            (callback) => connection.query(query5, callback),
          ],
          (error, results) => {
            if (error) {
              return reject(error);
            }
            return resolve(results);
          }
        );
      });
    })
  },
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
  setEnquiry: (data) => {

    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        var query = "INSERT INTO `enquiries` SET ?";
        // var values = {
        //   job_ref_num: req.body.job_ref_num,
        //   quote_date: req.body.quote_date,
        //   customer_id: req.body.customer_id,
        //   project_name: req.body.project_name,
        //   location: req.body.location,
        //   product_desc: req.body.product_desc,
        //   qty: req.body.qty,
        //   value: req.body.value,
        //   sales_engg: req.body.sales_engg,
        //   app_engg: req.body.app_engg,
        //   created: new Date(),
        //   createdby: req.body.createdby,
        // };
        var values = data[0];
        connection.query(query, values, (error, result1, fields) => {
          
        console.log(query,values);
          if (error) {
            console.log(error);
            return reject(error);
          }
          var results = [result1];
          console.log(results);
          return resolve(results);
        })
      })
    })
  },
  
  updateEnquiry: (data) => {

    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        var query = "UPDATE `luftekin_luftapp`.`enquiries` SET "
        query += "`jobRef` = '"+data[0].jobRef+"',"
        query += " `projectName` = '"+data[0].projectname+"',"
        query += " `customerId` = '"+data[0].customerId+"',"
        query += " `quoteDate` = '"+data[0].quoteDate+"',"
        query += " `productDesc` = '"+data[0].productdesc+"',"
        query += " `qty` = '"+data[0].qty+"',"
        query += " `value` = '"+data[0].value+"',"
        query += " `updated` = '"+data[0].updated+"',"
        query += " `updatedby` = '"+data[0].updatedby+"',"
        query += " `location` = '"+data[0].location+"',"
        query += " `salesEr` = '"+data[0].salesEr+"',"
        query += " `appEr` = '"+data[0].appEr+"'"
        query += " WHERE (`id` = '"+data[0].id+"');"

        var values = data[0];
        connection.query(query, values, (error, result1, fields) => {
          
        console.log(query,values);
          if (error) {
            console.log(error);
            return reject(error);
          }
          var results = [result1];
          console.log(results);
          return resolve(results);
        })
      })
    })
  }
};
