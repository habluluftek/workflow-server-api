const {
  getList,
  getDetails,
  getTroubles,
  getLogs,
  options, getMarginFactor
} = require("./options.service");
// const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const {
  sign
} = require("jsonwebtoken");

module.exports = {
  getList: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const results = await getList();

      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: {
          ahuPart: results[0][0],
          troubleList: results[1][0],
        }
      });
    } catch (e) {
      console.log(e);
      return res.json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: {}
      });
    }
  },
  options: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const results = await options();

      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: {
          currency: results[0][0],
          freight: results[1][0],
          gstRate: results[2][0],
          productList: results[3][0]
        }
      });
    } catch (e) {
      return res.json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: {}
      });
    }
  },

  getDetails: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const id = req.query.id
      const result = await getDetails(id);
      var users = result[0][0];
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: users
      });
    } catch (e) {
      return res.json({
        success: 0,
        message: {
          text: 'No Data Fetched ',
          errMsg: e.message
        },
        data: {}
      });
    }
  },
  getMarginFactor: async (req, res) => {
    try {
       var result = await getMarginFactor();
       return res.json({
         success:1,
         message: 'Successfully Data Fetched',
         data: result[0][0]
       })
    } catch (e) {
      return res.json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: {}
      });
    }
  }
}