var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require("node-cron");
let shell = require("shelljs");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const psychrolib = require('./models/psychrometric')

const {polyFit} = require('./models/polyfit')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(400).json({
    "statusCode": 400,
    "message": "not authenticated"
  })
}


// var unit = psyc

// psychrolib.SetUnitSystem(psychrolib.SI)
// var temp = psychrolib.GetRelHumFromTWetBulb(25,17.8894,101325)
// var wb = psychrolib.GetTWetBulbFromRelHum(25,50/100,101325)
// console.log((temp*100).toFixed(1),wb.toFixed(1));
//  // Calculate the dew point temperature for a dry bulb temperature of 25 C and a relative humidity of 80%
//  var TDewPoint = psychrolib.GetTDewPointFromRelHum(25.0, 0.5);
//  console.log('TDewPoint: %d', TDewPoint);
// poly_degree = 6
// points= [[2,2],[2,4],[4,6],[6,4],[8,2]]
// // coefficients of polynome 
// console.log(polyFit(points, poly_degree), 'exportpolyfitfn')

const {
  checkAuth
} = require('./routes/auth/services/loginService')

const serviceCallRoute = require('./routes/servicecall/serviceCall.router');
const usersRoute = require('./routes/users/users.router');
const customersRoute = require('./routes/customers/customers.router');
const optionsRoute = require('./routes/others/options/options.router');
const regionsRoute = require('./routes/others/regions/regions.router');
const enquiriesRoute = require('./routes/enquiries/enquiries.router');
const dailyReport = require('./routes/servicecall/serviceCall.controller');
const bom = require('./routes/bom/bom.router');
const coilCosting = require('./routes/coilCosting/coilCosting.router');
const ordersRoute = require('./routes/orders/orders.router');
const dashboardRoute = require('./routes/home/sales/sales.dash.router');
const enquiryDashboardRoute = require('./routes/home/enquiries/enquiries.dash.router');

const careRoute = require('./routes/care/care.router');
var google = require('googleapis');
const OAuth2 = google.auth;

// console.log(MAILING_SERVICE_CLIENT_ID)

var indexRouter = require('./routes/index');
// var loginRouter = require('./routes/auth/loginMongo');
var loginRouter = require('./routes/auth/login');

// var connectMongo = require('./models/mongoDBConnection');
// var pgDB = require('./models/pgdbconn');




var app = express();
// app.disable('etag');

cron.schedule('00 30 09 * * 0-6', () => {
  dailyReport.dailyReport();
},{
  scheduled: true,
  timezone: 'Asia/Kolkata'
});

cron.schedule('00 30 09 * * monday' ,() => {
  dailyReport.threeDaysReport();
},{
  scheduled: true,
  timezone: 'Asia/Kolkata'
})

// cron.schedule('00 37 12 * * friday', () =>{
// console.log('Cron Function Test', new Date());
// })

// app.use(cors());
// const allowedOrigins = process.env.allowedOrigins.split(',');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));

var allowedOrigins = ['http://localhost:4200', 'http://localhost:3200', 'http://localhost:4580',
                      'https://api.luftek.in','https://workflow.luftek.in'];
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// app.all('*', (req,res) => {
//   res.header("Access-Control-Allow-Origin", "*");
// })

// app.use((req,res,next) => {
//   res.header('Access-Control-Allow-Origin','*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   if(req.method === 'OPTIONS'){
//     res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }
// });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'data')));



app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/users', usersRoute);
// app.post('/login',function(req,res){
//   loginRouter.login(req,res)
// });
app.post('/login', loginRouter)

// const CryptoJS = require("crypto-js");

// const encrypt = (text) => {
//   return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
// };

// const decrypt = (data) => {
//   return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
// };
// var encodePass = encrypt('jmh146');
// var decodePass = decrypt(encodePass);
// console.log(encodePass == encrypt(decodePass))
// console.log(encodePass, decodePass);
// app.get('/ePass', loginRouter)

app.use('/care',careRoute )

app.use('/dashboard', checkAuth, dashboardRoute);
app.use('/enquiryDashboardRoute', checkAuth, enquiryDashboardRoute);
app.use('/options', checkAuth, optionsRoute);
app.use('/regions', checkAuth, regionsRoute);


app.use('/users', checkAuth, usersRoute);



app.use('/customers', checkAuth, customersRoute);


app.use('/enquiries', checkAuth, enquiriesRoute);
app.use('/orders', checkAuth, ordersRoute);
// app.use('/setEnquiry', setEnquiry);


app.use('/serviceCall', checkAuth, serviceCallRoute);
app.use('/bom', checkAuth,bom);
app.use('/coilCosting', checkAuth, coilCosting);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
