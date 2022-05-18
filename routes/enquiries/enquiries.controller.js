const {
  getList,
  getDetails,
  setEnquiry,
  updateEnquiry,
  getListMongo,
  setEnquiryMongo
} = require("./enquiries.service");
// const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const {
  sign
} = require("jsonwebtoken");

var moment = require('moment');

module.exports = {
  getList: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const results = await getList();

      var enquiriesData = results[0][0];
      var userData = results[1][0];
      var customerData = results[2][0];
      // console.log(salesErData);
      for (let index = 0; index < enquiriesData.length; index++) {
        var fnSales = userData.filter(
          (item) => item.id == enquiriesData[index].salesEr
        )[0].firstname;
        var lnSales = userData.filter(
          (item) => item.id == enquiriesData[index].salesEr
        )[0].lastname;
        var fnApp = userData.filter(
          (item) => item.id == enquiriesData[index].appEr
        )[0].firstname;
        var lnApp = userData.filter(
          (item) => item.id == enquiriesData[index].appEr
        )[0].lastname;
        var fnCreated = userData.filter(
          (item) => item.id == enquiriesData[index].createdby
        )[0].firstname;
        var lnCreated = userData.filter(
          (item) => item.id == enquiriesData[index].createdby
        )[0].lastname;
        var customer = customerData.filter(
          (item) => item.id == enquiriesData[index].customerId
        )[0]
        var customerName = customerData.filter(
          (item) => item.id == enquiriesData[index].customerId
        )[0].name;
        enquiriesData[index].customerName = customerName;
        enquiriesData[index].salesErName = fnSales + " " + lnSales;
        enquiriesData[index].appErName = fnApp + " " + lnApp;
        enquiriesData[index].createdbyName = fnCreated + " " + lnCreated;
        enquiriesData[index].customer = customer;
        if (enquiriesData[index].updatedby != null) {
          var fnUpdated = userData.filter(
            (item) => item.id == enquiriesData[index].updatedby
          )[0].firstname;
          var lnUpdated = userData.filter(
            (item) => item.id == enquiriesData[index].updatedby
          )[0].lastname;
          enquiriesData[index].updatedbyName = fnUpdated + " " + lnUpdated;
        }
      }
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: enquiriesData
      });
    } catch (e) {
      return res.json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: {}
      });
    }
  },
  // getListMongo: async (req, res) => {
  //   // const result = await getServiceCallList().then;
  //   try {
  //     const result = await getListMongo();
  //     var enquiryResponse = result[0].map(
  //       ({
  //         _id,
  //         jobRef,
  //         customer,
  //         quoteDate,
  //         projectName,
  //         qty,
  //         value,
  //         productDesc,
  //         location,
  //         salesEr,
  //         appEr,
  //         created,
  //         createdby,
  //         updated,
  //         updatedby
  //       }) => ({
  //         _id,
  //         jobRef,
  //         customerId: customer?.id,
  //         customerName: customer?.name,
  //         quoteDate,
  //         projectName,
  //         qty,
  //         value,
  //         productDesc,
  //         location,
  //         salesEr: salesEr?.id,
  //         salesErName: `${salesEr?.firstname} ${salesEr?.lastname}`,
  //         appEr: appEr?.id,
  //         appErName: `${appEr?.firstname} ${appEr?.lastname}`,
  //         created,
  //         createdbyName: createdby?.firstname,
  //         updated,
  //         updatedbyName: updatedby?.firstname
  //       }))
  //     var users = result[0];
  //     return res.status(200).json({
  //       success: 1,
  //       message: 'Successfully Data Fetched from Mongo',
  //       data: enquiryResponse
  //     });
  //   } catch (e) {
  //     throw e
  //     return res.json({
  //       success: 0,
  //       message: 'No Data Fetched' + ' ' + e.message,
  //       data: [{}]
  //     });
  //   }
  // },
  getListReport: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const results = await getList();

      var enquiriesData = results[0][0];
      var userData = results[1][0];
      var customerData = results[2][0];
      // console.log(salesErData);
      for (let index = 0; index < enquiriesData.length; index++) {
        var fnSales = userData.filter(
          (item) => item.id == enquiriesData[index].salesEr
        )[0].firstname;
        var lnSales = userData.filter(
          (item) => item.id == enquiriesData[index].salesEr
        )[0].lastname;
        var fnApp = userData.filter(
          (item) => item.id == enquiriesData[index].appEr
        )[0].firstname;
        var lnApp = userData.filter(
          (item) => item.id == enquiriesData[index].appEr
        )[0].lastname;
        var fnCreated = userData.filter(
          (item) => item.id == enquiriesData[index].createdby
        )[0].firstname;
        var lnCreated = userData.filter(
          (item) => item.id == enquiriesData[index].createdby
        )[0].lastname;
        var customer = customerData.filter(
          (item) => item.id == enquiriesData[index].customerId
        )[0]
        var customerName = customerData.filter(
          (item) => item.id == enquiriesData[index].customerId
        )[0].name;
        enquiriesData[index].customerName = customerName;
        enquiriesData[index].salesErName = fnSales + " " + lnSales;
        enquiriesData[index].appErName = fnApp + " " + lnApp;
        enquiriesData[index].createdbyName = fnCreated + " " + lnCreated;
        enquiriesData[index].customer = customer;
        if (enquiriesData[index].updatedby != null) {
          var fnUpdated = userData.filter(
            (item) => item.id == enquiriesData[index].updatedby
          )[0].firstname;
          var lnUpdated = userData.filter(
            (item) => item.id == enquiriesData[index].updatedby
          )[0].lastname;
          enquiriesData[index].updatedbyName = fnUpdated + " " + lnUpdated;
        }
      }
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: enquiriesData
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
      var data = result[0][0];
      var users = result[1][0];
      data.forEach((e,i) => {
        var createdFName = users.filter(i => i.id === e.createdby)[0]?.firstname;
        var createdLName = users.filter(i => i.id === e.createdby)[0]?.lastname;
        var updatedFName = users.filter(i => i.id === e.updatedby)[0]?.firstname;
        var updatedLName = users.filter(i => i.id === e.updatedby)[0]?.lastname;
        data[i].createdName = createdFName == undefined ? null : createdFName + ' ' + createdLName;
        data[i].updatedName = updatedFName == undefined ? null : updatedFName + ' ' + updatedLName;
      });
      result
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: data
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

  setEnquiry: async (req, res) => {
    try {
      var data = [req.body]
      const results = await setEnquiry(data);


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
  // setEnquiryMongo: async (req, res) => {
  //   try {
  //     var data = [req.body]
  //     const results = await setEnquiryMongo(data);


  //     return res.status(201).json({
  //       success: 1,
  //       message: 'Successfully Data Fetched',
  //       data: results
  //     });
  //   } catch (e) {
  //     return res.status(500).json({
  //       success: 0,
  //       message: 'No Data Fetched' + ' ' + e.message,
  //       data: {}
  //     });
  //   }
  // },

  updateEnquiry: async (req, res) => {
    try {
      var data = [req.body]
      const results = await updateEnquiry(data);


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

  search : async (req, res) => {
    try {
      var data = req.body;
      const results = await getList();
      var enquiriesData = results[0][0];
      var userData = results[1][0];
      var customerData = results[2][0];

      var startDateData = data.startDate == null ? enquiriesData : (enquiriesData.filter(i => moment(i.quoteDate).format("YYYY-MM-DD") >= data.startDate));
      var dateWiseData = data.endDate == null ? startDateData : (startDateData?.filter(i => moment(i.quoteDate).format("YYYY-MM-DD") <= data.endDate));
      let resultData;

      if(data.customerId == 'All' && data.salesEr == 'All'){
        console.log('All Customer and SalesEr');
        resultData = dateWiseData;
      } else if (data.customerId != 'All' && data.salesEr == 'All') {
        resultData = dateWiseData?.filter(i => i.customerId == data.customerId);
      } else if (data.customerId == 'All' && data.salesEr != 'All') {
        resultData = dateWiseData?.filter(i => i.salesEr == data.salesEr);
      } else {
        var customerWise = dateWiseData?.filter(i => i.customerId == data.customerId);
        resultData = customerWise?.filter(i => i.salesEr == data.salesEr);
      }

      for (let index = 0; index < resultData.length; index++) {
        var fnSales = userData.filter(
          (item) => item.id == resultData[index].salesEr
        )[0].firstname;
        var lnSales = userData.filter(
          (item) => item.id == resultData[index].salesEr
        )[0].lastname;
        var fnApp = userData.filter(
          (item) => item.id == resultData[index].appEr
        )[0].firstname;
        var lnApp = userData.filter(
          (item) => item.id == resultData[index].appEr
        )[0].lastname;
        var customerName = customerData.filter(
          (item) => item.id == resultData[index].customerId
        )[0].name;
        resultData[index].customerName = customerName;
        resultData[index].salesErName = fnSales + " " + lnSales;
        resultData[index].appErName = fnApp + " " + lnApp;
      }

      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: resultData
      });
    } catch (error) {
      return res.json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: []
      });
    }
  }
}