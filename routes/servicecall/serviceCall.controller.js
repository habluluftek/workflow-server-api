const {
  getList,
  getDetails,
  getTroubles,
  getLogs,
  setCall,
  setComplaint,
  setLog,
  setRespond,
  setComplete,
  dailyReport,
  threeDailyReport,
  report,
  reportDownload
} = require("./serviceCall.service");
// const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const {
  sign
} = require("jsonwebtoken");
const smsClient = require("../../models/sms");
const PDFToolsSdk = require('@adobe/documentservices-pdftools-node-sdk');
var format = require('date-format');
// var liveDocx = require('node-livedocx'), fs = require('fs');
var config = {
  username: 'hablu@luftek.in', // enter your livedocx username here
  password: 'Dio__109' // enter your livedocx password here
};

var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var path = require('path');

// const credentials =  PDFToolsSdk.Credentials
//         .serviceAccountCredentialsBuilder()
//         .fromFile(path.join(__dirname, '../../models/pdftools-api-credentials.json'))
//         .build();

// The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
function replaceErrors(key, value) {
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
      error[key] = value[key];
      return error;
    }, {});
  }
  return value;
}

function errorHandler(error) {
  console.log(JSON.stringify({
    error: error
  }, replaceErrors));

  if (error.properties && error.properties.errors instanceof Array) {
    const errorMessages = error.properties.errors.map(function (error) {
      return error.properties.explanation;
    }).join("\n");
    console.log('errorMessages', errorMessages);
    // errorMessages is a humanly readable message looking like this :
    // 'The tag beginning with "foobar" is unopened'
  }
  throw error;
}


module.exports = {
  getList: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const result = await getList();

      var serviceCalls = result[0][0];
      var reviewData = result[1][0];
      var userData = result[2][0];
      var customerData = result[3][0];
      var complaintData = result[4][0];
      var ahuParts = result[5][0];
      for (let index = 0; index < serviceCalls.length; index++) {
        var reviews = reviewData.filter(
          (item) => item.serviceCallId == serviceCalls[index].id
        );
        var complaints = complaintData.filter(
          (item) => item.serviceCallId == serviceCalls[index].id
        )
        var fnCreatedby = userData.filter(
          (item) => item.id == serviceCalls[index].createdby
        )[0].firstname;
        var lnCreatedby = userData.filter(
          (item) => item.id == serviceCalls[index].createdby
        )[0].lastname;
        var fnSales = userData.filter(
          (item) => item.id == serviceCalls[index].salesEr
        )[0].firstname;
        var lnSales = userData.filter(
          (item) => item.id == serviceCalls[index].salesEr
        )[0].lastname;
        var customerName = customerData.filter(
          (item) => item.id == serviceCalls[index].customerId
        )[0].name;
        serviceCalls[index].customerName = customerName;
        serviceCalls[index].salesErName = fnSales + " " + lnSales;
        serviceCalls[index].createdbyName = fnCreatedby + " " + lnCreatedby;
        serviceCalls[index].reviews = reviews
        serviceCalls[index].complaints = complaints
      }
      for (let index = 0; index < complaintData.length; index++) {
            var partName = ahuParts.filter(i => (i.id == complaintData[index].ahuPart))[0].name;
            complaintData[index].ahuPartName = partName
        
      }
      // complaintData.forEach(element,index => {
      //   var partName = ahuParts.filter(i => (i.id == element.ahuPart))[0].name;
      //   complaintData[index].ahuPartName = partName
      // });
      return res.set({
        'Content-Type': 'application/json'
      }).status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: {serviceCalls,complaintData}
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

  getDetails: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const id = req.query.id
      const result = await getDetails(id);

      var serviceCalls = result[0][0];
      var userData = result[1][0];
      var customerData = result[2][0];
      var statusData = result[3][0];
      var fnCreatedby = userData.filter(
        (item) => item.id == serviceCalls[0].createdby
      )[0].firstname;
      var lnCreatedby = userData.filter(
        (item) => item.id == serviceCalls[0].createdby
      )[0].lastname;
      var fnSales = userData.filter(
        (item) => item.id == serviceCalls[0].salesEr
      )[0].firstname;
      var lnSales = userData.filter(
        (item) => item.id == serviceCalls[0].salesEr
      )[0].lastname;
      var customerName = customerData.filter(
        (item) => item.id == serviceCalls[0].customerId
      )[0].name;
      var statusName = statusData.filter(
        (item) => item.id == serviceCalls[0].status
      )[0].name;
      serviceCalls[0].customerName = customerName;
      serviceCalls[0].salesErName = fnSales + " " + lnSales;
      serviceCalls[0].createdbyName = fnCreatedby + " " + lnCreatedby;
      serviceCalls[0].statusName = statusName
      return res.set({
        'Content-Type': 'application/json'
      }).status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: serviceCalls
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

  report: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const id = req.query.id
      console.log(id);
      const result = await report(id);

      var serviceCalls = result[0][0];
      var complaintData = result[1][0];
      var feedbackData = result[2][0];
      var reviewData = result[3][0];
      var userData = result[4][0];
      var customerData = result[5][0];
      var statusData = result[6][0];
      var troubleData = result[7][0];
      var ahuPartData = result[8][0];
      var fnCreatedby = userData.filter(
        (item) => item.id == serviceCalls[0].createdby
      )[0].firstname;
      var lnCreatedby = userData.filter(
        (item) => item.id == serviceCalls[0].createdby
      )[0].lastname;
      var fnSales = userData.filter(
        (item) => item.id == serviceCalls[0].salesEr
      )[0].firstname;
      var lnSales = userData.filter(
        (item) => item.id == serviceCalls[0].salesEr
      )[0].lastname;

      var fnService = userData.filter(
        (item) => item.id == serviceCalls[0].attnby
      )[0].firstname;
      var lnService = userData.filter(
        (item) => item.id == serviceCalls[0].attnby
      )[0].lastname;
      var customerName = customerData.filter(
        (item) => item.id == serviceCalls[0].customerId
      )[0].name;
      var statusName = statusData.filter(
        (item) => item.id == serviceCalls[0].status
      )[0].name;
      serviceCalls[0].customerName = customerName;
      serviceCalls[0].salesErName = fnSales + " " + lnSales;
      serviceCalls[0].serviceErName = fnService + " " + lnService;
      serviceCalls[0].createdbyName = fnCreatedby + " " + lnCreatedby;
      serviceCalls[0].statusName = statusName
      for (let index = 0; index < complaintData.length; index++) {
        var complaintDataDecode = troubleData.filter(
          (item) => item.id == complaintData[index].trouble
        )[0].name
        var complaintDataDecodePart = ahuPartData.filter(
          (item) => item.id == complaintData[index].ahuPart
        )[0].name
        complaintData[index].complaintName = complaintDataDecode
        complaintData[index].partName = complaintDataDecodePart
      }


      for (let index = 0; index < feedbackData.length; index++) {
        var feedbackDataDecodefn = userData.filter(
          (item) => item.id == feedbackData[index].createdby
        )[0].firstname
        var feedbackDataDecodeln = userData.filter(
          (item) => item.id == feedbackData[index].createdby
        )[0].lastname
        feedbackData[index].createdName = feedbackDataDecodefn + ' ' + feedbackDataDecodeln
        feedbackData[index].type = 'feedback'
      }
      for (let index = 0; index < reviewData.length; index++) {
        var reviewDataDecodefn = userData.filter(
          (item) => item.id == reviewData[index].createdby
        )[0].firstname
        var reviewDataDecodeln = userData.filter(
          (item) => item.id == reviewData[index].createdby
        )[0].lastname
        reviewData[index].createdName = reviewDataDecodefn + ' ' + reviewDataDecodeln
        reviewData[index].type = 'review'
      }
      var logs = feedbackData.concat(reviewData)
      logs.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      })


      //Load the docx file as a binary
      var content = fs
        .readFileSync(path.resolve(__dirname, 'template/serviceCallReportTemplate.docx'), 'binary');

      var zip = new PizZip(content);
      var doc;
      try {
        doc = new Docxtemplater(zip);
      } catch (error) {
        // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
        errorHandler(error);
      }

      //set the templateVariables
      doc.setData({
        customerName: serviceCalls[0].customerName,
        projectName: serviceCalls[0].projectName,
        jobRef: serviceCalls[0].jobRef,
        callDate: format('dd-MM-yyyy', serviceCalls[0].regDate),
        mcTag: serviceCalls[0].mcTag,
        serialNo: serviceCalls[0].mcSerialNum,
        invoiceNo: serviceCalls[0].invoiceNum,
        callDesc: serviceCalls[0].callDesc,
        complaints: complaintData,
        attnDate: format('dd-MM-yyyy', serviceCalls[0].attnDate),
        completedDate: format('dd-MM-yyyy', serviceCalls[0].completedDate),
        salesErName: serviceCalls[0].salesErName,
        serviceErName: serviceCalls[0].serviceErName,
        complaintDesc: serviceCalls[0].complaintDesc,
        customerRemarks: serviceCalls[0].customerRemarks,
        correction: serviceCalls[0].correction,
      });

      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
      } catch (error) {
        // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
        errorHandler(error);
      }

      var buf = doc.getZip()
        .generate({
          type: 'nodebuffer'
        });

      // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
      fs.writeFileSync(path.resolve(__dirname, 'template/output.docx'), buf);


      return res.set({
        'Content-Type': 'application/json'
      }).status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: {
          serviceCalls: serviceCalls,
          complaintData: complaintData,
          logs: logs
        }
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

  reportDownload: async (req, res) => {
    try {
      var file = path.join(__dirname, 'template/output.docx');
    //   const executionContext = PDFToolsSdk.ExecutionContext.create(credentials),
    //     createPdfOperation = PDFToolsSdk.CreatePDF.Operation.createNew();

    // // Set operation input from a source file.
    // const input = PDFToolsSdk.FileRef.createFromLocalFile(path.join(__dirname, 'template/output.docx'));
    // createPdfOperation.setInput(input);
    // fs.unlinkSync(path.join(__dirname, 'template/output.pdf'));
    //   var outputFile = path.join(__dirname, 'template/output.pdf');
    //   // if(outputFile){
    //   //   fs.
    //   // }
    // // Execute the operation and Save the result to the specified location.
    // createPdfOperation.execute(executionContext)
    
    //     .then(result => {result.saveAsFile(path.join(__dirname, 'template/output.pdf'));
    //   res.setHeader('Content-type', 'application/pdf');

    //   res.download(outputFile, 'output.pdf');
    //   })
    //     .catch(err => {
    //         if(err instanceof PDFToolsSdk.Error.ServiceApiError
    //             || err instanceof PDFToolsSdk.Error.ServiceUsageError) {
    //             console.log('Exception encountered while executing operation', err);
    //         } else {
    //             console.log('Exception encountered while executing operation', err);
    //         }
    //     });
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessing');
      res.download(file, 'output.docx');
    } catch (error) {
      res.send(error)
    }
  },

  getTroubles: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const id = req.query.id
      const result = await getTroubles(id);
      var complaintData = result[0][0];
      var troubleData = result[1][0];
      var ahuPartData = result[2][0];
      for (let index = 0; index < complaintData.length; index++) {
        var complaintDataDecode = troubleData.filter(
          (item) => item.id == complaintData[index].trouble
        )[0].name
        var complaintDataDecodePart = ahuPartData.filter(
          (item) => item.id == complaintData[index].ahuPart
        )[0].name
        complaintData[index].complaintName = complaintDataDecode
        complaintData[index].partName = complaintDataDecodePart
      }
      return res.set({
        'Content-Type': 'application/json'
      }).status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: complaintData
      });
    } catch (e) {
      return res.json({
        success: 0,
        message: 'No Data Fetched',
        data: []
      });
    }
  },

  getLogs: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const id = req.query.id
      const result = await getLogs(id);
      var feedbackData = result[0][0];
      var reviewData = result[1][0];
      var userData = result[2][0];
      for (let index = 0; index < feedbackData.length; index++) {
        var feedbackDataDecodefn = userData.filter(
          (item) => item.id == feedbackData[index].createdby
        )[0].firstname
        var feedbackDataDecodeln = userData.filter(
          (item) => item.id == feedbackData[index].createdby
        )[0].lastname
        feedbackData[index].createdName = feedbackDataDecodefn + ' ' + feedbackDataDecodeln
        feedbackData[index].type = 'feedback'
      }
      for (let index = 0; index < reviewData.length; index++) {
        var reviewDataDecodefn = userData.filter(
          (item) => item.id == reviewData[index].createdby
        )[0].firstname
        var reviewDataDecodeln = userData.filter(
          (item) => item.id == reviewData[index].createdby
        )[0].lastname
        reviewData[index].createdName = reviewDataDecodefn + ' ' + reviewDataDecodeln
        reviewData[index].type = 'review'
      }
      var logs = feedbackData.concat(reviewData)
      logs.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      })
      return res.set({
        'Content-Type': 'application/json'
      }).status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: logs
      });
    } catch (e) {
      return res.json({
        success: 0,
        message: {
          text: 'No Data Fetched ',
          errMsg: e.message
        },
        data: []
      });
    }
  },

  setCall: async (req, res) => {
    try {
      var data = [req.body]
      const results = await setCall(data);
      let user = [];
      for (i = 0; i < results[2].length; i++) {
        user.push({
          name: results[2][i].firstname,
          phone: results[2][i].phoneNum,
          serviceCallId: results2[0].id,
          createdby: results4[0].firstname,
        });
      }

      // user.push({
      //     name: 'Hablu',
      //     phone: '9566152724',
      //     serviceCallId: '1',
      //     createdby: 'Rahul',
      //   });

      for (i = 0; i < user.length; i++) {
        smsClient.setServiceCall(user[i]);
      }

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

  setComplaint: async (req, res) => {
    try {
      var data = req.body
      const results = await setComplaint(data);

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

  setLog: async (req, res) => {
    try {
      var data = [req.body]
      const results = await setLog(data);

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

  setRespond: async (req, res) => {
    try {
      var data = [req.body]
      const results = await setRespond(data);

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

  setComplete: async (req, res) => {
    try {
      var data = [req.body]
      const results = await setComplete(data);
      let user = [];
      for (i = 0; i < results[2].length; i++) {
        user.push({
          name: results[2][i].firstname,
          phone: results[2][i].phoneNum,
          serviceCallId: results[3]
        });
      }
      console.log(user);
      for (i = 0; i < user.length; i++) {
        smsClient.setServiceCallCompleted(user[i]);
      }
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



  dailyReport: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const result = await dailyReport();
      var pendingCallData = result[0][0]
      var progressCallData = result[1][0]
      var pendingCall = result[0][0].length;
      var progressCall = result[1][0].length;
      var currentDate = new Date();

      for (i = 0; i < pendingCall; i++) {
        const diffTime = Math.abs(currentDate - pendingCallData[i].regDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        pendingCallData[i].dateDiff = diffDays
      }
      for (i = 0; i < progressCall; i++) {
        const diffTime = Math.abs(currentDate - progressCallData[i].regDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        progressCallData[i].dateDiff = diffDays
      }
      var numofPendingCallSeven = pendingCallData.filter(i => (i.dateDiff >= 7))
      var numofPendingCallThree = pendingCallData.filter(i => (i.dateDiff >= 3))

      var numofProgressCallSeven = progressCallData.filter(i => (i.dateDiff >= 7))
      var numofProgressCallThree = progressCallData.filter(i => (i.dateDiff >= 3))



      let user = []
      for (i = 0; i < result[2][0].length; i++) {
        user.push({
          name: result[2][0][i].firstname,
          phone: result[2][0][i].phoneNum,
          pendingCall: pendingCall,
          progressCall: progressCall,
        });
      }
      if(pendingCall !== '0' && progressCall !== '0'){
        console.log('user');
        for (i = 0; i < user.length; i++) {
          smsClient.setServiceCallDailyReport(user[i]);
        }
      }
      // console.log({
      //   pendingmorethan7 : numofPendingCallSeven.length,
      // pendingmorethan3 : numofPendingCallThree.length,
      // progressmorethan7 : numofProgressCallSeven.length,
      // progressmorethan3 : numofProgressCallThree.length,
      // });
      // console.log(user);
      console.log('Daily Report Sent');
      return res.set({
        'Content-Type': 'application/json'
      }).status(200).json({
        pendingmorethan7: numofPendingCallSeven.length,
        pendingmorethan3: numofPendingCallThree.length,
        progressmorethan7: numofProgressCallSeven.length,
        progressmorethan3: numofProgressCallThree.length,
      })
    } catch (e) {
      // return console.log(e, 'Error');
      // return res.set({
      //   'Content-Type': 'application/json'
      // }).json({
      //   success: 0,
      //   message: 'No Data Fetched' + ' ' + e.message,
      //   data: {}
      // });
    }
  },

    threeDaysReport: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const result = await threeDailyReport();
      var pendingCallData = result[0][0]
      var progressCallData = result[1][0]
      var pendingCall = result[0][0].length;
      var progressCall = result[1][0].length;
      var currentDate = new Date();

      for (i = 0; i < pendingCall; i++) {
        const diffTime = Math.abs(currentDate - pendingCallData[i].regDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        pendingCallData[i].dateDiff = diffDays
      }
      for (i = 0; i < progressCall; i++) {
        const diffTime = Math.abs(currentDate - progressCallData[i].regDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        progressCallData[i].dateDiff = diffDays
      }
      var numofPendingCallSeven = pendingCallData.filter(i => (i.dateDiff >= 7))
      var numofPendingCallThree = pendingCallData.filter(i => (i.dateDiff >= 3))

      var numofProgressCallSeven = progressCallData.filter(i => (i.dateDiff >= 7))
      var numofProgressCallThree = progressCallData.filter(i => (i.dateDiff >= 3))

      var moreThanSeven = numofPendingCallSeven.length + numofProgressCallSeven.length;
      var moreThanThree = numofPendingCallThree.length + numofProgressCallThree.length;

      // var moreThanSeven = 0;
      // var moreThanThree = 0;
      let user = []
      for (i = 0; i < result[2][0].length; i++) {
        user.push({
          name: result[2][0][i].firstname,
          phone: result[2][0][i].phoneNum,
          moreThanSeven, 
          moreThanThree,
        });
      }
      if(moreThanSeven != 0 || moreThanThree != 0){
        // console.log('user');
        console.log(typeof(moreThanThree), typeof(moreThanSeven));
        for (i = 0; i < user.length; i++) {
          // console.log('gkkk');
          // smsClient.threeDailyReport(user[i]);
        }
      }
      console.log('Daily Report Sent');
      return res.set({
        'Content-Type': 'application/json'
      }).status(200).json({user})
    } catch (e) {
      // return console.log(e, 'Error');
      // return res.set({
      //   'Content-Type': 'application/json'
      // }).json({
      //   success: 0,
      //   message: 'No Data Fetched' + ' ' + e.message,
      //   data: {}
      // });
    }
  },


}