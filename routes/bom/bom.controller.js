const {
  getList,
  getDetails,
  set,
  getItemMaster,
  bomProcess,
  bomProcessJson,
  getItemMasterXLSX,
  getItemMasterJson
} = require("./bom.service");
// const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const {
  sign
} = require("jsonwebtoken");
const Excel = require('exceljs');
// global.fetch = require("node-fetch");
// global.fetch = require('fetch')
var fs = require('fs');
var path = require('path');
var XLSX = require('xlsx');
// var XlsxModule = require("docxtemplater-xlsx-module");
module.exports = {
  getItemMaster: async (req, res) => {
    try {
      const results = await getItemMaster();
      // const results = await getItemMasterJson();
      var itemMasterList = results[0][0];
      var bomMenuData = results[1][0];
      var bomMenu = results[2][0];

      for (let index = 0; index < bomMenuData.length; index++) {
        var bomMenuName = bomMenu.filter(
          (item) => item.id == bomMenuData[index].menuId
        )[0].name;
        bomMenuData[index].menuName = bomMenuName
      }
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: {
          itemMasterList: itemMasterList,
          bomMenuData: bomMenuData
        }
      });
    } catch (error) {
      return res.json({
        success: 0,
        message: 'No Data Fetched' + ' ' + error.message,
        data: {}
      });
    }
  },
  getItemMasterXLSX: async (req, res) => {
    try {
      const results = await getItemMasterXLSX();
      var itemMasterList = results

      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: itemMasterList
      });
    } catch (error) {
      return res.json({
        success: 0,
        message: {
          message: 'No Data Fetched',
          error: error
        },
        data: {}
      });
    }
  },
  getList: async (req, res) => {
    // const result = await getServiceCallList().then;
    try {
      const results = await getList();

      var customerList = results[0][0];
      var customerAddress = results[1][0];
      var region = results[2][0];
      // var customerData = results[3][0];

      for (let index = 0; index < customerAddress.length; index++) {
        var region_name = region.filter(
          (item) => item.id == customerAddress[index].region
        )[0].name;
        customerAddress[index].regionName = region_name;
      }
      for (let index = 0; index < customerList.length; index++) {
        var address = customerAddress.filter((item) => item.customerId == customerList[index].id);
        customerList[index].address = address;
      }
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: customerList
      });
    } catch (e) {
      return res.json({
        success: 0,
        message: 'No Data Fetched' + ' ' + e.message,
        data: {}
      });
    }
  },
  bomProcess: async (req, res) => {
    try {
      const data = req.body;
      const results = await bomProcess(data);
      // const results = await bomProcessJson(data);
      // console.log(results[4]);
      var casingData = results.casing
      var coilData = results.coil

      const erpTempWorkBook = new Excel.Workbook();

      erpTempWorkBook.xlsx.readFile(path.join(__dirname, 'template/ZipERP_Template.xlsx')).then(() => {
        var erpTempSheet = erpTempWorkBook.getWorksheet(1);
        erpTempSheet.getCell('A1').value = 'ZipERP BOM Import Template'

        var headerCol = erpTempSheet.getRow(3).values
        
        erpTempSheet.columns = [
          {  key : 'SrNo'       },
          {  key : 'BOMType'    },
          {  key : 'Plant'      },
          {  key : 'Item_Code'  },
          {  key : 'Item_Name'  },
          {  key : 'BOMVariant' },
          {  key : 'BaseQty'    },
          {  key : 'BaseUnit'   },
          {  key : 'ItemCode'   },
          {  key : 'ItemName'   },
          {  key : 'Qty'       ,style: { numFmt: '0.00' } },
          {  key : 'Unit'       },
          {  key : 'ItemType'   }
        ]
        // console.log(results);
        erpTempSheet.addRows(results);
        // erpTempSheet.commit();
        erpTempWorkBook.xlsx.writeFile(path.join(__dirname, './template/bom.xlsx'));

        // var wb = XLSX.readFile(path.join(__dirname, 'template/bom.xlsx'))
  //       res.header(
  //   'Access-Control-Allow-Headers',
  //   'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  // );
  // if(req.method === 'OPTIONS'){
  //   res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET');
  //   return res.status(200).json({});
  // }
      // res.setHeader('Access-Control-Allow-Origin', 'https://workflow.luftek.in,http://localhost:4500');

      // res.setHeader('Access-Control-Allow-Credentials', true);
        
        return res.status(200).json({
          success: 1,
          message: 'Successfully Data Fetched',
          data: results
        })
      })
      // var coilData = 
    } catch (error) {
      // throw errorres.header('Access-Control-Allow-Origin','*');
      console.log(error);
      return res.status(200).json({
        success: 0,
        message: {
          text: 'No Data Fetched ',
          errMsg: error.message
        },
        data: {}
      })
    }
  },
  downloadBOM :async (req, res) => {
     var file =path.join(__dirname, 'template/bom.xlsx');
     res.header('Access-Control-Allow-Origin','*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.download(file, `New_Bom.xlsx`);
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

  set: async (req, res) => {
    try {
      var data = req.body
      const results = await set(data);
      return res.status(200).json({
        success: 1,
        message: 'Successfully Data Fetched',
        data: results
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
  }
}