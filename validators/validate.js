const jwt = require('jsonwebtoken')
var resultsNotFound = {
  errorCode : 1 ,
  errorMessage : 'Server Error',
  rowCount : '0',
  data: ''
};

module.exports = {
  checkInputDataNULL : function(req,res){
    // console.log('req.body');
    // console.log(req.body);

    if(req.body === undefined || req.body === {}) return res.send(resultsNotFound);
  },
  checkInputDataQuality : function(req, res){
    resultsNotFound.errorMessage = 'User Already Exist';
    if (req.body.user_email_id == "") return res.send(resultsNotFound)
  },
  checkJWTToken: function(req, res) {
    const token = req.headers.token;
    if (!token) res.sendStatus(400);
    const decoded = jwt.verify(
    token.replace('Bearer ', ''),
    process.env.JWT_SECRET,
    );
    resultsNotFound["errorMessage"] = "Your token in not valid, please logoff and login again.";
    if (!decoded) return res.send(resultsNotFound);

    // console.log(decoded);
    return decoded.email;

}
};
