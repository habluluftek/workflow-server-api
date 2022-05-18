var async = require("async");
var express = require('express');
var router = express.Router();
var pool = require('../../models/dbconnection');
var loginService = require('./services/loginService');
var bcrypt = require("bcryptjs");


const jwt = require('jsonwebtoken');
const {
  lookup
} = require('geoip-lite');
const moment = require('moment-timezone');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;


var result = {
  code: Number,
  message: '',
  data: ''
}
let handleLogin = async (req, res) => {
  // passport.use(new localStrategy('login',{
  //   usernameField: req.body.username,
  //     passwordField: req.body.password,
  //     passReqToCallback: true // allows us to pass back the entire request to the callback
  // },
  //   async function(request, username, password, done) {
  //      try {
  //        console.log(request, username, password);
  //        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //        var login = await loginService.handleLogin(username, password, ip);
  //       return done(res.send(login));
  //     } catch (error) {
  //       return done(res.send(error),false);
  //     }
  //   }
  // ));
  
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var login = await loginService.handleLogin(req.body.username, req.body.password, ip);
    res.send(login)
  } catch (error) {
    res.send(error)
  }
};

router.route('/login').post(handleLogin);


function postRouteHandler(req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    var query = "SELECT * FROM `users` WHERE `username` = ?";
    var values = [req.body.username];
    connection.query(query, values, function (error, results, fields) {
      if (error) {
        result.code = 0
        result.message = "Something went wrong with the server, Error:" + error;
        return res.send(result);
      }
      if (!results.length) {
        result.message =
          "User is not available. Please contact admin!";
        return res.send(result);
      }
      if (results[0]?.active == null || results[0]?.active == false) {
        result.code = 0
        result.message =
          "Your Account is Deactivated. Please contact admin to reactivate!";
        return res.send(result);
      }
      if (req.body.password == results[0].password) {

        // hash password
        let salt = bcrypt.genSaltSync(10);
        console.log(salt);
        let userItem = {
          email: req.body.username,
          password: bcrypt.hashSync(req.body.password, salt),
        };
        // let passwordMatch;
        // bcrypt.compare(req.body.password, results[0].encryptedPassword).then((isMatch) => {
        //       if (isMatch) {
        //         var decryptedPassword = bcrypt.getRounds(results[0].encryptedPassword)
        //         console.log(decryptedPassword);
        //         passwordMatch =true;
        //       } else {
        //         passwordMatch = false;
        //       }
        // console.log(passwordMatch);
        //     });
        var token = {
          token: jwt.sign({
              email: results[0].username,
              userData: results[0]
            },
            process.env.JWT_SECRET, {
              expiresIn: "50m"
            }
          ),
        };
        result["data"] = token;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const currentDate = moment(new Date()).tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
        const currentDateDB = moment(results[0].currentLoggedInDate).format('YYYY-MM-DD HH:mm:ss');
        var query2 = "UPDATE luftekin_luftapp.users SET  lastLoggedInDate = '" + currentDateDB +
          "', lastLoggedInIP = '" + results[0].currentLoggedInIP + "', lastLoggedInLocation = '" +
          results[0].currentLoggedInLocation + "', currentLoggedInDate = '" + currentDate +
          "', currentLoggedInIP = '" + ip + "', currentLoggedInLocation = '" +
          JSON.stringify(lookup(ip)) + "' WHERE(id = '" + results[0].id + "');"
        // var query2 = "UPDATE luftekin_luftapp.users SET encryptedPassword ='" + userItem.password +"', lastLoggedInDate = '" + currentDateDB +
        //   "', lastLoggedInIP = '" + results[0].currentLoggedInIP + "', lastLoggedInLocation = '" +
        //   results[0].currentLoggedInLocation + "', currentLoggedInDate = '" + currentDate +
        //   "', currentLoggedInIP = '" + ip + "', currentLoggedInLocation = '" +
        //   JSON.stringify(lookup(ip)) + "' WHERE(id = '" + results[0].id + "');"
        connection.query(query2, (error1, result1) => {
          if (error1) {
            connection.release();
            result.code = 0
            result.message = "Something went wrong with the server, Error:" + error1;
            return res.send(result);
          } else {
            connection.release();
            result.code = 1
            result.message = "Successfully Logged in";
            return res.send(result);
          }
        })
      } else {
        connection.release();
        result.code = 0
        result.message = "Incorrect Password";
        return res.send(result);
      }
    });
  });
}

module.exports = router;