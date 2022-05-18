var mysql = require('mysql');
require('dotenv').config();


var pool  = mysql.createPool({
  connectionLimit : 999999,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USERNAME,
  password        : process.env.DB_PASSWORD,
  database        : process.env.DB_NAME,
  multipleStatements: true
});
pool.getConnection(function(err, connection) {
    if (err) {console.log(err.message); }
    console.log('Connected to a DB : '+process.env.DB_NAME+' | Host : '+ process.env.DB_HOST);

  });

module.exports = pool;
