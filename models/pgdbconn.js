var {Client} = require('pg');
require('dotenv').config();
const pgClient = new Client({
  host: process.env.PG_DB_HOST,
    user: process.env.PG_DB_USERNAME,
    port: 5432,
    password: process.env.PG_DB_PASSWORD,
    database: process.env.PG_DB_NAME,
});
// var pool = pg.Pool
// var pool  = mysql.createPool({
//   connectionLimit : 999999,
//   host            : process.env.DB_HOST,
//   user            : process.env.DB_USERNAME,
//   password        : process.env.DB_PASSWORD,
//   database        : process.env.DB_NAME,
//   multipleStatements: true
// });
// pool.getConnection(function(err, connection) {
//     if (err) {console.log(err.message); }
//     console.log('Connected to a DB : '+process.env.DB_NAME+' | Host : '+ process.env.DB_HOST);

//   });
pgClient.connect().then(() => {
console.log('Connected to a PG DB : ' + process.env.PG_DB_NAME + ' | Host : ' + process.env.PG_DB_HOST);
}).catch((error) => {
  console.log(error);
})

module.exports = pgClient;
