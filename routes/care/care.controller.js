const {
  setCustomerFeedback,
} = require("./care.service");
// const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const {
  sign
} = require("jsonwebtoken");

var moment = require('moment');

module.exports = {
  
  setCustomerFeedback: async (req, res) => {
    try {
      var data = req.body;
      const results = await setCustomerFeedback(data);
      return res.status(201).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: results
      });
    } catch (e) {
      return res.status(500).json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: {}
      });
    }
  },

}