const {
  getList,
  getDetails,
  setOrder,
  updateEnquiry,
  setOrderItem,
  setEstimatedCost,
  query,
  getFiles,
  setFile,
  fileUpload,
  setPPCApproved,
  sendProductionPlan,
  sendForPPC,
  setOrderItemUpload,
  updateOrder,
  setDispatch,
  searchBilling,
  downloadFile,
  uploadFile,
  setListPrice,
  setActualCost,
  setInstallationCost
} = require("./orders.service");
var _ = require('underscore');
var status = require('../../data/options/status.json');

var {
  gmail,
  zohomail,
  a2Email
} = require('../../models/email');

var readHTMLFile = require('../../models/readHtml');
var handlebars = require('handlebars');
var moment = require('moment');


// var fs = require('fs');

// var readHTMLFile = function (path, callback) {
//   fs.readFile(path, {
//     encoding: 'utf-8'
//   }, function (err, html) {
//     if (err) {
//       throw err;
//       callback(err);
//     } else {
//       callback(null, html);
//     }
//   });
// };
// const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const {
  sign
} = require("jsonwebtoken");

module.exports = {

  testEmail: async (req, res) => {
    try {
      // connectMongo();
      var mailOptions = {
        from: 'Hablu <hablu@pruebasolutions.com> ',
        to: 'hablu@luftek.in',
        cc: `hablullah1@gmail.com`,
        bcc: 'habloo@outlook.com',
        subject: `Zoho email test _mainaccount@luftek.in`,
        html: 'Zoho Email Test from hosted server'
      };
      a2Email.sendMail(mailOptions, (error, info) => {
        // console.log(info);
        return res.status(201).json({
          success: 1,
          message: 'Successfully Data Fetched',
          data: {
            msg: 'Zoho Email Test',
            info,
            error
          }
        });
      });
    } catch (error) {
      return res.status(201).json({
        success: 0,
        message: 'Failed',
        data: error

      });
    }
  },


  getList: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const results = await getList();

      var orderlist = results[0][0];
      var items = results[1][0];
      var products = results[2][0];
      var userList = results[3][0];
      var customerList = results[4][0];
      var dispatchList = results[5][0];
      var paymentList = results[6][0];
      var currencyList = results[7][0];
      // console.log(salesErData);
      for (let index = 0; index < orderlist?.length; index++) {

        var fnSales = userList?.filter(
          (item) => item.id == orderlist[index]?.salesEr
        )[0]?.firstname;
        var lnSales = userList?.filter(
          (item) => item.id == orderlist[index]?.salesEr
        )[0]?.lastname;
        var fnCreated = userList?.filter(
          (item) => item.id == orderlist[index]?.createdby
        )[0]?.firstname;
        var lnCreated = userList?.filter(
          (item) => item.id == orderlist[index]?.createdby
        )[0]?.lastname;

        var customerName = customerList?.filter(
          (item) => item.id == orderlist[index]?.customerId
        )[0]?.name;


        var currency = currencyList?.filter(i => i.id == orderlist[index]?.currency)[0];
        var orderItems = items?.filter(
          (item) => item.soNum == orderlist[index]?.soNum
        )
        // console.log(orderItems);
        // for (var i = 0; i < orderItems.length; i++) {
        //   var product = products?.filter(
        //     (item) => item.id == orderItems[i].productId
        //   )
        //   element.product = product[i]
        // }

        var dispatches = dispatchList?.filter(
          item => item.soNum == orderlist[index]?.soNum
        )

        var payments = paymentList?.filter(
          item => item.soNum == orderlist[index]?.soNum
        )

        var _status = status.filter(i => i.id == orderlist[index]?.status)[0]
        orderlist[index].currency = currency
        orderlist[index].items = orderItems
        orderlist[index].customerName = customerName;
        orderlist[index].salesErName = fnSales + " " + lnSales;
        orderlist[index].createdbyName = fnCreated + " " + lnCreated;
        if (orderlist[index]?.updatedby != null) {
          var fnUpdated = userList?.filter(
            (item) => item.id == orderlist[index]?.updatedby
          )[0].firstname;
          var lnUpdated = userList?.filter(
            (item) => item.id == orderlist[index]?.updatedby
          )[0].lastname;
          orderlist[index].updatedbyName = fnUpdated + " " + lnUpdated;
        }
        orderlist[index].dispatches = dispatches;
        orderlist[index].payments = payments;
        orderlist[index].status = _status;
      }
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: orderlist
      });
    } catch (e) {
      console.log(e);
      return res.json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: []
      });
    }
  },
  // getListMongo: async (req, res) => {
  //     // const result = await getServiceCallList().then;
  //     try {
  //       const result = await getListMongo();

  //       var users = result[0];
  //       return res.status(200).json({
  //         success: 1,
  //         message: 'Successfully Data Fetched from Mongo',
  //         data: users
  //       });
  //     } catch (e) {
  //       return res.json({
  //         success: 0,
  //         message: 'No Data Fetched' + ' ' + e.message,
  //         data: {}
  //       });
  //     }
  //   },

  getDetails: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const id = req.query.id
      const result = await getDetails(id);
      var data = result[0][0];
      var items = result[1][0];
      var products = result[2][0];
      var userList = result[3][0];
      var customerList = result[4][0];
      var dispatchList = result[5][0];
      var paymentList = result[6][0];
      var freightList = result[7][0];
      var currencyList = result[8][0];

      var salesEr = userList?.filter(i => i.id == data[0]?.salesEr)[0]
      var customer = customerList?.filter(i => i.id == data[0]?.customerId)[0]
      // for (let i = 0; i < items.length; i++) {
      //   const e = items[i];
      //   var productData = products.filter(i => i.id == e?.productId)[0];
      //   items[i].product = productData;
      // }
      var freight = freightList.filter(i => i.id == data[0]?.freightScope)[0];
      var _status = status.filter(i => i.id == data[0]?.status)[0];
      var currency = currencyList.filter(i => i.id == data[0]?.currency)[0];
      data[0].currency = currency
      data[0].items = items;
      data[0].salesEr = salesEr;
      data[0].customer = customer;
      data[0].dispatches = dispatchList;
      data[0].payments = paymentList;
      data[0].freightScope = freight;
      data[0].status = _status;

      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: data
      });
    } catch (e) {
      console.log(e);
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

  getFiles: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const id = req.query.id
      const result = await getFiles(id);
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: result.result.entries
      });
    } catch (e) {
      console.log(e);
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

  fileUpload: async (req, res) => {
    try {
      const data = req
      // console.log(data);
      return res.json(data)
      // const result = await
    } catch (error) {

    }
  },
  downloadFile: async (req, res) => {
    try {
      const data = req.body;
      const result = await downloadFile(data);
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: result
      });
    } catch (error) {
      return res.json({
        success: 0,
        message: {
          text: 'No Data Fetched ',
          errMsg: error.message
        },
        data: {}
      });
    }
  },
  uploadFile: async (req, res) => {
    try {
      const data = req.body;
      const result = await uploadFile(data);
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: result
      });
    } catch (error) {
      return res.json({
        success: 0,
        message: {
          text: 'No Data Fetched ',
          errMsg: error
        },
        data: {}
      });
    }
  },

  setDispatch: async (req, res) => {
    try {
      const data = req.body;
      const result = await setDispatch(data)
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: result
      });
    } catch (error) {
      return res.json({
        success: 0,
        message: {
          text: 'No Data Fetched ',
          errMsg: error.message
        },
        data: null
      });
    }
  },
  // getDetailsMongo: async (req, res) => {
  //   // const result = await getServiceCallList().then;
  //   try {
  //     const id = req.query.id
  //     const result = await getDetailsMongo(id);
  //     var users = result;
  //     return res.status(200).json({
  //       success: 1,
  //       message: 'Successfully Data Fetched',
  //       data: users
  //     });
  //   } catch (e) {
  //     return res.json({
  //       success: 0,
  //       message: {
  //         text: 'No Data Fetched ',
  //         errMsg: e.message
  //       },
  //       data: {}
  //     });
  //   }
  // },
  // setOrderMongo: async (req, res) => {
  //     try{
  //       var data = [req.body]
  //       const results = await setOrderMongo(data);


  //       return res.status(201).json({
  //         success: 1,
  //         message: 'Successfully Data Fetched Mongo',
  //         data: results
  //       });
  //     } catch(e){
  //       return res.status(500).json({
  //         success: 0,
  //         message: 'No Data Fetched' + ' ' + e.message,
  //         data: {}
  //       });
  //     }
  //   },
  setOrder: async (req, res) => {
    try {
      var data = [req.body]
      const results = await setOrder(data);
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
  setFile: async (req, res) => {
    try {
      var data = req.body
      console.log(data);
      var result = await setFile(data)
      return res.status(201).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: 0,
        message: 'No Data Fetched' + ' ' + error.message,
        data: {}
      });
    }
  },
  setOrderItem: async (req, res) => {
    try {
      var data = req.body
      var results = await setOrderItem(data);
      return res.status(201).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: results
      });
    } catch (e) {
      return res.status(500).json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: []
      });
    }
  },
  setOrderItemUpload: async (req, res) => {
    try {
      var data = req.body
      console.log(data.length);
      var results = await setOrderItemUpload(data);
      return res.status(201).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: results
      });
    } catch (e) {
      return res.status(500).json({
        success: 0,
        message: 'No Data Fetched HABLU' + ' ' + e,
        data: data[0].soNum
      });
    }
  },
  setEstimatedCost: async (req, res) => {
    try {
      var data = req.body;
      var results = await setEstimatedCost(data);
      return res.status(201).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: results
      });
    } catch (error) {
      return res.status(500).json({
        success: 0,
        message: 'No Data Fetched' + ' ' + error.message,
        data: []
      });
    }
  },

  setListPrice: async (req, res) => {
    try {
      var data = req.body;
      var results = await setListPrice(data);
      return res.status(201).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: results
      });
    } catch (error) {
      return res.status(500).json({
        success: 0,
        message: 'No Data Fetched' + ' ' + error.message,
        data: []
      });
    }
  },
  setActualCost: async (req, res) => {
    try {
      var data = req.body;
      var results = await setActualCost(data);
      return res.status(201).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: results
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: 0,
        message: 'No Data Fetched' + ' ' + error.message,
        data: []
      });
    }
  },
  setInstallationCost: async (req, res) => {
    try {
      var data = req.body;
      var results = await setInstallationCost(data);
      return res.status(201).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: results
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: 0,
        message: 'No Data Fetched' + ' ' + error.message,
        data: []
      });
    }
  },

  setPPCApproved: async (req, res) => {
    try {
      const id = req.query.id
      console.log(id);
      const result = await setPPCApproved(id);
      return res.status(201).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: 0,
        message: 'No Data Fetched',
        data: error.message
      });
    }
  },

  sendForPPC: async (req, res) => {
    try {
      const id = req.query.id;
      const result = await sendForPPC(id);
      return res.status(201).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: 0,
        message: 'No Data Fetched',
        data: error.message
      });

    }
  },




  sendProductionPlan: async (req, res) => {
    try {
      var data = req.body;
      var results = await sendProductionPlan(data);
      readHTMLFile(`${__dirname}/emailTemplates/productionPlan.html`, (err, html) => {
        if (err) {
          console.log(err);
        }
        var template = handlebars.compile(html)
        var replacements = data?.so;
        var htmlRender = template(replacements);
        var mailOptions = {
          from: 'Workflow <luftekengineering@gmail.com>',
          to: 'dhiwakar@luftek.in',
          cc: `${data?.so?.salesErEmail};sameem@luftek.in;manikandans@luftek.in`,
          bcc: 'akthar@luftek.in;prem@luftek.in',
          subject: `SO# ${data?.so?.soNum}/${data?.so?.jobRef} - ${data?.so?.projectName} is Sent for Production Plan`,
          html: htmlRender
        };
        gmail.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          }
          // console.log(info);
          return res.status(201).json({
            success: 1,
            message: 'Successfully Data Fetched',
            data: {
              results,
              info
            }
          });
        });
      })


    } catch (e) {
      return res.status(500).json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: e
      });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const data = req.body
      const result = await updateOrder(data);
      return res.status(201).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: 0,
        message: 'No Data Fetched',
        data: error.message
      });

    }
  },
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
  query: async (req, res) => {
    // try {
    //   const results = await query();
    //   return res.status(200).json(results[0][0]);
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
    try {
      const results = await query();

      var enquiriesData = results[0][0];
      var userData = results[1];
      var customerData = results[2];
      // console.log(salesErData);
      for (let index = 0; index < enquiriesData.length; index++) {
        var fnSales = userData.filter(
          (item) => item.id == enquiriesData[index].salesEr
        )[0];
        var lnSales = userData.filter(
          (item) => item.id == enquiriesData[index].salesEr
        )[0].lastname;
        var fnApp = userData.filter(
          (item) => item.id == enquiriesData[index].appEr
        )[0];
        var lnApp = userData.filter(
          (item) => item.id == enquiriesData[index].appEr
        )[0].lastname;
        var fnCreated = userData.filter(
          (item) => item.id == enquiriesData[index].createdby
        )[0];
        var lnCreated = userData.filter(
          (item) => item.id == enquiriesData[index].createdby
        )[0].lastname;
        var customer = customerData.filter(
          (item) => item.id == enquiriesData[index].customerId
        )[0]
        enquiriesData[index].salesEr = fnSales;
        enquiriesData[index].appEr = fnApp;
        enquiriesData[index].createdby = fnCreated;
        enquiriesData[index].customer = customer;
        enquiriesData[index].coilCositing = [];
        if (enquiriesData[index].updatedby != null) {
          var fnUpdated = userData.filter(
            (item) => item.id == enquiriesData[index].updatedby
          )[0];
          var lnUpdated = userData.filter(
            (item) => item.id == enquiriesData[index].updatedby
          )[0].lastname;
          enquiriesData[index].updatedby = fnUpdated;
        }
        delete enquiriesData[index]["customerId"]
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

  sendEstimatedCost: async (req, res) => {
    try {
      var data = req.body;
      console.log(data);
      readHTMLFile(`${__dirname}/emailTemplates/costingEstimated.html`, (err, html) => {
        if (err) {
          console.log(err);
        }
        var template = handlebars.compile(html)
        var replacements = data;
        var htmlRender = template(replacements);
        var mailOptions = {
          from: 'Workflow <luftekengineering@gmail.com>',
          to: 'dhiwakar@luftek.in',
          cc: `${data?.so?.appErEmail}`,
          bcc: 'akthar@luftek.in;prem@luftek.in',
          subject: `SO# ${data.soNum}/${data.jobRef} Costing Sheet (Estimated)`,
          html: htmlRender
        };
        gmail.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          }
          console.log(info);
          return res.status(201).json({
            success: 1,
            message: 'Successfully Data Fetched',
            data: {
              // results,
              info
            }
          });
        });
      })

    } catch (e) {
      return res.status(500).json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: e
      });
    }
  },

  search: async (req, res) => {
    try {
      var data = req.body;
      const results = await getList();
      var orderlist = results[0][0];
      var items = results[1][0];
      var products = results[2][0];
      var userList = results[3][0];
      var customerList = results[4][0];
      var dispatchList = results[5][0];
      var paymentList = results[6][0];
      var currencyList = results[7][0];
      var startDateData = data.startDate == null ? orderlist : (orderlist.filter(i => moment(i.poDate).format("YYYY-MM-DD") >= data.startDate));

      var dateWiseData = data.endDate == null ? startDateData : (startDateData?.filter(i => moment(i.poDate).format("YYYY-MM-DD") <= data.endDate));
      let resultData;
      if (data.customerId == 'All' && data.salesEr == 'All') {
        console.log('All Customer and SalesEr');
        resultData = dateWiseData;
        console.log(resultData.length)
      } else if (data.customerId != 'All' && data.salesEr == 'All') {
        resultData = dateWiseData?.filter(i => i.customerId == data.customerId);
      } else if (data.customerId == 'All' && data.salesEr != 'All') {
        resultData = dateWiseData?.filter(i => i.salesEr == data.salesEr);
      } else {
        var customerWise = dateWiseData?.filter(i => i.customerId == data.customerId);
        resultData = customerWise?.filter(i => i.salesEr == data.salesEr);
      }

      for (let index = 0; index < resultData.length; index++) {
        var fnSales = userList?.filter(
          (item) => item.id == resultData[index]?.salesEr
        )[0]?.firstname;
        var lnSales = userList?.filter(
          (item) => item.id == resultData[index]?.salesEr
        )[0]?.lastname;
        var fnCreated = userList?.filter(
          (item) => item.id == resultData[index]?.createdby
        )[0]?.firstname;
        var lnCreated = userList?.filter(
          (item) => item.id == resultData[index]?.createdby
        )[0]?.lastname;

        var customerName = customerList?.filter(
          (item) => item.id == resultData[index]?.customerId
        )[0]?.name;


        var currency = currencyList?.filter(i => i.id == resultData[index]?.currency)[0];
        var orderItems = items?.filter(
          (item) => item.soNum == resultData[index]?.soNum
        )
        // console.log(orderItems);
        // for (var i = 0; i < orderItems.length; i++) {
        //   var product = products?.filter(
        //     (item) => item.id == orderItems[i].productId
        //   )
        //   element.product = product[i]
        // }

        var dispatches = dispatchList?.filter(
          item => item.soNum == resultData[index]?.soNum
        )

        var payments = paymentList?.filter(
          item => item.soNum == resultData[index]?.soNum
        )

        var _status = status.filter(i => i.id == resultData[index]?.status)[0]
        resultData[index].currency = currency
        resultData[index].items = orderItems
        resultData[index].customerName = customerName;
        resultData[index].salesErName = fnSales + " " + lnSales;
        resultData[index].createdbyName = fnCreated + " " + lnCreated;
        if (resultData[index]?.updatedby != null) {
          var fnUpdated = userList?.filter(
            (item) => item.id == resultData[index]?.updatedby
          )[0].firstname;
          var lnUpdated = userList?.filter(
            (item) => item.id == resultData[index]?.updatedby
          )[0].lastname;
          resultData[index].updatedbyName = fnUpdated + " " + lnUpdated;
        }
        resultData[index].dispatches = dispatches;
        resultData[index].payments = payments;
        resultData[index].status = _status;
      }
      let detailedResult = [];

      if (data.reportType == 'Detailed') {
        resultData.forEach((d) => {
          var items = d.items
          items.forEach((_d) => {
            var obj = {
              soNum: d.soNum,
              jobRef: d.jobRef,
              product: _d.productId + ' ' + _d.productRef,
              poDate: d.poDate,
              customerName: d.customerName,
              projectName: d.projectName,
              salesErName: d.salesErName,
              poPrice: _d.rate,
              qty: _d.qty,
              listPrice: _d.listPrice,
              actualCost: _d.actualProductionCost,
              marginFactor: d.marginFactor
            }
            detailedResult.push(obj)
          })
        })
      }

      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: data.reportType == 'Detailed' ? detailedResult : resultData
      });
    } catch (error) {
      return res.json({
        success: 0,
        message: 'No Data Fetched' + ' ' + error.message,
        data: []
      });
    }
  },

  searchBilling: async (req, res) => {
    try {
      const data = req?.body
      const results = await searchBilling();
      //  const saleOrdersData = results[0][0];
      const dispatches = results[0][0];
      const saleOrderItems = results[1][0];
      const saleOrders = results[2][0];
      const _dispatchData = dispatches?.map(({
        itemIds,
        qty,
        actualDispatchDate,
        freightCharge,
        soNum
      }) => ({
        soNum,
        itemIds: itemIds.split(',').map(x => +x),
        qty: qty.split(',').map(x => +x),
        totalDCQty: qty.split(',').map(x => +x).reduce((a,b) => a+b,0),
        dispatchDate: actualDispatchDate,
        freightCharge
      }));

      let _dispatch = []
      for (const obj of _dispatchData) {
        obj.itemIds.forEach((items, i) => {
          _dispatch.push({
            soNum: obj.soNum,
            itemId: items,
            qty: obj.qty[i],
            totalDCQty: obj.totalDCQty,
            dispatchDate: obj.dispatchDate,
            actualfreightCharge: obj.qty[i] == 0 ? 0 : parseFloat((obj.freightCharge / obj.totalDCQty).toFixed(2))
          })
        })
      }
      const billedOrdersData = _dispatch.map(({
          soNum,
          itemId,
          qty,
          totalDCQty,
          dispatchDate,
          actualfreightCharge
        }) => ({
          itemId,
          soNum,
          jobRef: saleOrders.filter(i => i.soNum === soNum)[0].jobRef,
          poDate: saleOrders.filter(i => i.soNum === soNum)[0].poDate,
          project: saleOrders.filter(i => i.soNum === soNum)[0].projectName,
          customerId: saleOrders.filter(i => i.soNum === soNum)[0].customerId,
          customerName: saleOrders.filter(i => i.soNum === soNum)[0].customerName,
          product: saleOrderItems.filter(i => i.id == itemId)[0].productId,
          tag: saleOrderItems.filter(i => i.id == itemId)[0].productRef,
          rate: saleOrderItems.filter(i => i.id == itemId)[0].rate,
          qty,
          marginFactor: saleOrders.filter(i => i.soNum === soNum)[0].marginFactor,
          estimatedFreightFactor: saleOrders.filter(i => i.soNum === soNum)[0].freightCharge,
          estimatedInstallationFactor: saleOrders.filter(i => i.soNum === soNum)[0].installationCharge,
          listPrice: saleOrderItems.filter(i => i.id === itemId)[0].listPrice,
          estimatedMaterialCost: (saleOrderItems.filter(i => i.id === itemId)[0].listPrice * saleOrders.filter(i => i.soNum === soNum)[0].marginFactor),
          estimatedFreightCost:(saleOrderItems.filter(i => i.id === itemId)[0].listPrice * saleOrders.filter(i => i.soNum === soNum)[0].freightCharge / 100),
          estimatedInstallationCost: (saleOrderItems.filter(i => i.id === itemId)[0].listPrice * saleOrders.filter(i => i.soNum === soNum)[0].installationCharge / 100),
          actualMaterialCost: saleOrderItems.filter(i => i.id == itemId)[0].actualProductionCost,
          actualFreightCost: actualfreightCharge ,
          actualInstallationCost: saleOrderItems.filter(i => i.id == itemId)[0].installationCharge,
          dispatchDate: new Date(dispatchDate),
          salesEr: saleOrders.filter(i => i.soNum === soNum)[0].salesEr,
          salesErName: saleOrders.filter(i => i.soNum === soNum)[0].salesErName
        })).filter(i => i.qty !== 0)
        .map(
          ({
          itemId,
          soNum,
          jobRef,
          poDate,
          project,
          customerId,
          customerName,
          product,
          tag,
          rate,
          qty,
          listPrice,
          estimatedMaterialCost,
          estimatedFreightCost,
          estimatedInstallationCost,
          actualMaterialCost,
          actualFreightCost,
          actualInstallationCost,
          dispatchDate,
          salesEr,
          salesErName,
        }) => ({
          itemId,
          soNum,
          jobRef,
          poDate,
          project,
          customerId,
          customerName,
          product,
          tag,
          rate,
          qty,
          listPrice,
          //estimated
          estimatedMaterialCost: parseFloat(estimatedMaterialCost.toFixed(2)),
          estimatedMaterialCostMargin: parseFloat(((1 - (estimatedMaterialCost / rate)) * 100).toFixed(2)),
          estimatedMaterialCostProfit: parseFloat((rate - estimatedMaterialCost).toFixed(2)),
          estimatedFreightCost: parseFloat(estimatedFreightCost.toFixed(2)),
          estimatedInstallationCost: parseFloat(estimatedInstallationCost.toFixed(2)),
          estimatedCost: parseFloat((estimatedMaterialCost + estimatedFreightCost + estimatedInstallationCost).toFixed(2)),
          estimatedCostMargin: parseFloat(((1 - ((estimatedMaterialCost + estimatedFreightCost + estimatedInstallationCost) / rate)) * 100).toFixed(2)),
          estimatedCostProfit: parseFloat((rate - (estimatedMaterialCost + estimatedFreightCost + estimatedInstallationCost)).toFixed(2)),
          //actual
          actualMaterialCost: actualMaterialCost == null ? null : parseFloat(actualMaterialCost.toFixed(2)),
          actualMaterialCostMargin: actualMaterialCost == null ? null : parseFloat(((1 - (actualMaterialCost / rate)) * 100).toFixed(2)),
          actualMaterialCostProfit: actualMaterialCost == null ? null : parseFloat((rate - actualMaterialCost).toFixed(2)),
          actualFreightCost: actualFreightCost == null ? null : parseFloat(actualFreightCost.toFixed(2)),
          actualInstallationCost: actualInstallationCost == null ? null : parseFloat(actualInstallationCost.toFixed(2)),
          actualCost: actualMaterialCost == null ? null : parseFloat((actualMaterialCost + actualFreightCost + actualInstallationCost).toFixed(2)),
          actualCostMargin: actualMaterialCost == null ? null : parseFloat(((1 - ((actualMaterialCost + actualFreightCost + actualInstallationCost) / rate)) * 100).toFixed(2)),
          actualCostProfit: actualMaterialCost == null ? null : parseFloat((rate - (actualMaterialCost + actualFreightCost + actualInstallationCost)).toFixed(2)),
          dispatchDate,
          salesEr,
          salesErName,
        }))
      var startDateData = data?.startDate === null ? billedOrdersData : (billedOrdersData.filter(i => moment(i.dispatchDate).format("YYYY-MM-DD") >= data.startDate));
      var dateWiseData = data?.endDate === null ? startDateData : (startDateData?.filter(i => moment(i.dispatchDate).format("YYYY-MM-DD") <= data.endDate));
      let resultData;
      if (data.customerId == 'All' && data.salesEr == 'All') {
        resultData = dateWiseData;
        // console.log(resultData.length)
      } else if (data.customerId != 'All' && data.salesEr == 'All') {
        resultData = dateWiseData?.filter(i => i.customerId == data?.customerId);
      } else if (data.customerId == 'All' && data.salesEr != 'All') {
        resultData = dateWiseData?.filter(i => i.salesEr == data?.salesEr);
      } else {
        var customerWise = dateWiseData?.filter(i => i.customerId == data?.customerId);
        resultData = customerWise?.filter(i => i.salesEr == data?.salesEr);
      }

      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: resultData
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: 0,
        message: 'No Data Fetched' + ' ' + error.message,
        data: []
      });
    }
  }
}