const {
  getList,
  getDetails,
  getTroubles,
  getLogs,
} = require("./regions.service");
// const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  getList: async (req, res) => {
    // const result = await getServiceCallList().then;
    try{
      const result = await getList();
      
      var users = result[0][0];
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: users
      });
    } catch(e){
      return res.json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: {}
      });
    }
    },
  
  getDetails: async (req, res) => {
    // const result = await getServiceCallList().then;
    try{
      const id = req.query.id
      const result = await getDetails(id);
      var users = result[0][0]; 
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: users
      });
    } catch(e){
      return res.json({
        success: 0,
        message: {text:'No Data Fetched ', errMsg: e.message},
        data: {}
      });
    }
    },
}
