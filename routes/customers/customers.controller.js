const {
  getList,
  getDetails,
  set,getCustomerFeedback,
  // setPGDB, getListPG
} = require("./customers.service");
// const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  getList: async (req, res) => {
    // const result = await getServiceCallList().then;
    try{
      const results = await getList();
      // const pgResults = await getListPG();
      // const pgData = pgResults?.rows;
      // var dataPG = pgData.map(({
      //       CustomerName,
      //       CustomerID,SalesErID,
      //     }) => ({
      //       id: CustomerID,
      //   name: CustomerName,
      //   address: [{
      //     customerId: CustomerID,
      //     salesEr: SalesErID
      //   }]
      // }));
      // console.log(dataPG[0])
      var customerList = results[0][0];
      var customerAddress = results[1][0];
      var region = results[2][0];
      // var customerData = results[3][0];

      for (let index = 0; index < customerAddress.length; index++) {
        var region_name = region.filter(
              (item) => item.id == customerAddress[index]?.region
            )[0]?.name;
            customerAddress[index].regionName = region_name;
      }
      for (let index = 0; index < customerList.length; index++) {
        var address = customerAddress.filter((item) => item?.customerId == customerList[index]?.id);
        customerList[index].address = address;
      }
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: customerList,
        // dataPG
      });
    } catch(e){
      return res.json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: {}
      });
    }
    },
  
  getCustomerFeedback: async (req, res) => {
    try {
      const result = await getCustomerFeedback();
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: result[0][0]
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
  
  set: async (req, res) => {
    try{
      var data = req.body
      const results = await set(data);
      const resultPG = await setPGDB(data);
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: {
          results,
          resultPG
        }
      });
    } catch(e) {
      return res.json({
      success: 0,
      message: {text:'No Data Fetched ', errMsg: e.message},
      data: {}
    });
    }
  }
}
