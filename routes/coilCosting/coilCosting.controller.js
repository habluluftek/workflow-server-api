const {
  getCoilPriceList,
  getDetails,
  setEnquiry,
  updateEnquiry,
} = require("./coilCosting.service");
// const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  getCoilPriceList: async (req,res) => {
    try {
      const id = req.query.id
    const result = await getCoilPriceList(id);
    var enquiryDetails = result[0][0]
    var coilPriceList = result[1][0]
    var coilTubes = result[2][0]
    var bomMenuData = result[3][0]
    var bomMenu = result[4][0]
    for (let index = 0; index < bomMenuData.length; index++) {
      var bomMenuName = bomMenu.filter(
        (item) => item.id == bomMenuData[index].menuId
      )[0].name;
      bomMenuData[index].menuName = bomMenuName
      }
    return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: {enquiryDetails:enquiryDetails, coilPriceList:coilPriceList, coilTubes:coilTubes,bomMenuData:bomMenuData}
      });
      } catch (error) {
        return res.json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: {}
      });
      }
  },
  // getList: async (req, res) => {
  //   // const result = await getServiceCallList().then;
  //   try{
  //     const results = await getList();
      
  //     var enquiriesData = results[0][0];
  //         var userData = results[1][0];
  //         var customerData = results[2][0];
  //         // console.log(salesErData);
  //         for (let index = 0; index < enquiriesData.length; index++) {
  //           var fnSales = userData.filter(
  //             (item) => item.id == enquiriesData[index].salesEr
  //           )[0].firstname;
  //           var lnSales = userData.filter(
  //             (item) => item.id == enquiriesData[index].salesEr
  //           )[0].lastname;
  //           var fnApp = userData.filter(
  //             (item) => item.id == enquiriesData[index].appEr
  //           )[0].firstname;
  //           var lnApp = userData.filter(
  //             (item) => item.id == enquiriesData[index].appEr
  //           )[0].lastname;
  //           var fnCreated = userData.filter(
  //             (item) => item.id == enquiriesData[index].createdby
  //           )[0].firstname;
  //           var lnCreated = userData.filter(
  //             (item) => item.id == enquiriesData[index].createdby
  //           )[0].lastname;
            
  //           var customerName = customerData.filter(
  //             (item) => item.id == enquiriesData[index].customerId
  //           )[0].name;
  //           enquiriesData[index].customerName = customerName;
  //           enquiriesData[index].salesErName = fnSales + " " + lnSales;
  //           enquiriesData[index].appErName = fnApp + " " + lnApp;
  //           enquiriesData[index].createdbyName = fnCreated + " " + lnCreated;
  //           if(enquiriesData[index].updatedby != null){
  //           var fnUpdated = userData.filter(
  //             (item) => item.id == enquiriesData[index].updatedby
  //           )[0].firstname;
  //           var lnUpdated = userData.filter(
  //             (item) => item.id == enquiriesData[index].updatedby
  //           )[0].lastname;
  //           enquiriesData[index].updatedbyName = fnUpdated + " " + lnUpdated;
  //           }
  //         }
  //     return res.status(200).json({
  //       success: 1,
  //       message: 'Successfully Data Fetched',
  //       data: enquiriesData
  //     });
  //   } catch(e){
  //     return res.json({
  //       success: 0,
  //       message: 'No Data Fetched' + ' ' + e.message,
  //       data: {}
  //     });
  //   }
  //   },
  
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
  
  setEnquiry: async (req, res) => {
      try{
        var data = [req.body]
        const results = await setEnquiry(data);
        

        return res.status(201).json({
          success: 1,
          message: 'Successfully Data Fetched',
          data: results
        });
      } catch(e){
        return res.status(500).json({
          success: 0,
          message: 'No Data Fetched' + ' ' + e.message,
          data: {}
        });
      }
    },
  
  updateEnquiry: async (req, res) => {
      try{
        var data = [req.body]
        const results = await updateEnquiry(data);
        

        return res.status(201).json({
          success: 1,
          message: 'Successfully Data Fetched',
          data: results
        });
      } catch(e){
        return res.status(500).json({
          success: 0,
          message: 'No Data Fetched' + ' ' + e.message,
          data: {}
        });
      }
    },
}
