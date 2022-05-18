const pool = require("../../../models/dbconnection");
var status = require('../../../data/options/status.json');
var async = require("async");
// import { Observable } from "rxjs";


module.exports = {


    getEnquiries: () => {
        return new Promise((resolve, reject) => {
            var query0 = 'SELECT * FROM luftekin_luftapp.saleOrderItems;';
            var query1 = 'SELECT * FROM luftekin_luftapp.saleOrderItems where listPrice is null or listPrice <= 10;';
            var query2 = 'SELECT a.soNum, a.poDate, a.projectName, a.customerId, c.name AS customerName, a.salesEr, CONCAT(b.firstname," " ,b.lastname) AS salesErName FROM luftekin_luftapp.saleOrder a INNER JOIN customers c ON a.customerId = c.id INNER JOIN users b ON a.salesEr = b.id ORDER BY a.poDate DESC LIMIT 5;'
            var query3 = 'SELECT * FROM luftekin_luftapp.saleOrder WHERE MONTH(poDate) = MONTH(CURRENT_DATE()) AND YEAR(poDate) = YEAR(CURRENT_DATE());'
            var query4 = 'SELECT * FROM luftekin_luftapp.saleOrder WHERE MONTH(poDate) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) AND YEAR(poDate) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH);'
            var query5 = 'SELECT * FROM luftekin_luftapp.saleOrderItems where actualProductioncost is null or listPrice <= 10;';
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    async.parallel([
                            (cb) => connection.query(query0, cb),
                            (cb) => connection.query(query1, cb),
                            (cb) => connection.query(query2, cb),
                            (cb) => connection.query(query3, cb),
                            (cb) => connection.query(query4, cb),
                            (cb) => connection.query(query5, cb),
                        ],
                        (error, result) => {
                            if (error) {
                                connection.release();
                                reject(error)
                            } else {
                                connection.release();
                                resolve(result)
                            }
                        })
                }
            })
        })
    },


    chartData: () => {
        return new Promise((resolve, reject) => {
            var query0 = `SELECT a.id, a.customerId, b.name as customerName, a.quoteDate, a.qty, a.value, a.salesEr, CONCAT(c.firstname , "" , c.lastname) AS salesErName, a.appEr,CONCAT(c.firstname , "" , c.lastname) as appErName FROM luftekin_luftapp.enquiries a INNER JOIN  customers b ON a.customerId = b.id INNER JOIN  users c ON a.salesEr = c.id INNER JOIN  users d ON a.appEr = d.id;`;
           
            pool.getConnection((err0, connection) => {
                if (err0) {
                    return reject(err0)
                }
                async.parallel([
                    (cb) => connection.query(query0, cb),
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




}