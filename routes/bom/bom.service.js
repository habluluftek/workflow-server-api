const pool = require("../../models/dbconnection");
var async = require("async");
var fs = require('fs');
var path = require('path');
var formula = require('./template/formula');
var casingService = require('./erpServices/casing.service')
var coilService = require('./erpServices/coil.service')
var fanService = require('./erpServices/fan.service')
var filterService = require('./erpServices/filter.service');
var accessoriesService = require("./erpServices/accessories.service");

var {damper} = require('./erpServices/assessories.services/qtyCalc/damper');
var {coil} = require('./erpServices/coil.services/qtyCalc/coil');
var {fan} = require('./erpServices/fan.services/qtyCalc/fan');
var {casing} = require('./erpServices/casing.services/qtyCalc/casing');


var XLSX = require('xlsx');
const Excel = require('exceljs');
const FileSaver = require('file-saver');
const {
  type
} = require("os");
const Blob = require("cross-blob");

const FormulaParser = require('hot-formula-parser').Parser;
const {
  string
} = require("pizzip/js/support");
const parserCasing = new FormulaParser();

if (typeof crypto == "undefined") crypto = require("crypto");

function getCellResult(worksheet, cellLabel) {
  if (worksheet.getCell(cellLabel).formula) {
    return parserCasing.parse(worksheet.getCell(cellLabel).formula).result;
  } else {
    return worksheet.getCell(cellCoord.label).value;
  }
}

module.exports = {
  getItemMaster: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if(err) {return reject(err)}
        var query1 = "SELECT * FROM `item_master_new`;"
        var query2 = "SELECT * FROM `bomMenuData`;"
        var query3 = "SELECT * FROM `bomMenu`;"
        async.parallel(
          [
            (callback) => connection.query(query1, callback),
            (callback) => connection.query(query2, callback),
            (callback) => connection.query(query3, callback)
          ],
          (error, results) => {
            if (error) {
              connection.release();
              return reject(error);
            }
            connection.release();
            return resolve(results);
          }
        )
      })
    })
  },
  getItemMasterJson: () => {
    return new Promise((resolve, reject) => {
      var bomMenu = require('./template/bomMenu.json');
      var bomMenuData = require('./template/bomMenuData.json');
      var itemMaster = require('./template/itemMaster.json');
      var results = [
        [itemMaster],
        [bomMenuData],
        [bomMenu]
      ]
      return resolve(results);
    })
  },
  getItemMasterXLSX: () => {
    return new Promise((resolve, reject) => {
      var file = XLSX.readFile(path.join(__dirname, 'template/itemMaster.csv'));
      var sheet = file.SheetNames
      console.log(sheet);
      var data = XLSX.utils.sheet_to_json(file.Sheets[sheet[0]])

      return resolve(data);
    })
  },
  getList: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if(err) {return reject(err);}
        var query1 = "SELECT * FROM `customers`";
        var query2 = 'SELECT * FROM `customer_address`';
        var region = "SELECT * FROM luftekin_luftapp.region";
        async.parallel(
          [
            (callback) => connection.query(query1, callback),
            (callback) => connection.query(query2, callback),
            (callback) => connection.query(region, callback),
          ],
          (error, results) => {
            if (error) {
              connection.release();
              return reject(error);
            }
            connection.release();
            return resolve(results);
          }
        );
      });
    })
  },
  getDetails: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) throw err;
        var query1 = 'SELECT * FROM `users` where id = ' + id + ';';

        async.parallel(
          [
            (callback) => connection.query(query1, callback),
          ],
          (err, results) => {
            if (err) {
              return reject(err);
            }
            return resolve(results);
          });
      })
    })
  },
  bomProcess: (data) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if(err) {return reject(err);}
        var query1 = "SELECT * FROM `item_master_new`;"
        var query2 = "SELECT * FROM `bomMenuData`;"
        var query3 = "SELECT * FROM `bomMenu`;"
        async.parallel(
          [
            (callback) => connection.query(query1, callback),
            (callback) => connection.query(query2, callback),
            (callback) => connection.query(query3, callback)
          ],
          (error, results) => {
            if (error) {
              connection.release();
              return reject(error);
            }
            //Casing Calculation Starts
            var itemMaster = results[0][0]
            var bomMenu = results[1][0]
            // console.log(bomMenu);
            var unitQty = 1
            
            var casingQty = casing(data)
            var fanQty = fan();
            var coilQty = coil(data, bomMenu)
            var accessoriesQty = damper(data);
            var filterQty = {}

            let reportData = []
            if (
              // data.unitForm.supplyDimension?.length > 0 ||
              (data.unitForm.supplyDimension[0]?.length != null || data.unitForm.supplyDimension[0]?.width != null || data.unitForm.supplyDimension[0]?.height != null)) {
            var casingData = casingService.casing(data, casingQty, itemMaster, unitQty);
            // console.log('Casing', data.unitForm.supplyDimension?.length, data.unitForm.supplyDimension[0]?.length, data.unitForm.supplyDimension[0]?.width, data.unitForm.supplyDimension[0]?.height);
            casingData.forEach(e => {
              reportData.push(e)
            })
            }
            var fanData = fanService.fan(data, fanQty, itemMaster, unitQty);
            fanData.forEach(e => {
              reportData.push(e)
            })
            if(data.coilForm?.coils?.length != 0 && data.coilForm?.coils[0]?.coilType != null && data.coilForm?.coils[0]?.qty != null){
              var coilData = coilService.coil(data, coilQty, itemMaster, unitQty);
              coilData.forEach(e => {
                reportData.push(e)
              })
            }
            if(
              data.filterForm?.filters?.length > 0 || 
              data.filterForm?.filters[0]?.qty != null || data.filterForm?.filters[0]?.qty != undefined) {
                console.log('Filer Working');
              var filterData = filterService.filter(data, filterQty, itemMaster, unitQty);
              console.log('Filter', data.filterForm?.filters?.length, data.filterForm?.filters[0]?.qty);
              filterData.forEach(e => {
                reportData.push(e)
              })
            }
            // if(data.accessoriesForm?.dampers?.length != 0 && data.accessoriesForm?.dampers[0]?.qty !== null && data.accessoriesForm?.doors?.length != 0 && data.accessoriesForm?.doors[0]?.qty !== null){
              var accessoriesData = accessoriesService.accessories(data, accessoriesQty, itemMaster, unitQty)
              accessoriesData.dampers.forEach(e => {
                reportData.push(e);
              })
              accessoriesData.doors.forEach(e => {
                reportData.push(e);
              })
            // }
            connection.release();
            return resolve(reportData);
          }
        )
      })




    })
  },

  bomProcessJson: (data) => {
    return new Promise((resolve, reject) => {

      var bomMenu = require('./template/bomMenu.json');
      var bomMenuData = require('./template/bomMenuData.json');
      var itemMaster = require('./template/itemMaster.json');
      var results = [
        [itemMaster],
        [bomMenuData],
        [bomMenu]
      ]

      var itemMaster = results[0][0]
      var supplyLength = {
        sl: data.unitForm.supplyDimension
      };
      var exhaustLength = {
        el: data.unitForm.exhaustDimension
      };
      const supplyLengthSum = Object.values(supplyLength).reduce((a, v) => a += v.reduce((a, ob) => a += ob.length, 0), 0);
      const exhaustLengthSum = Object.values(exhaustLength).reduce((a, v) => a += v.reduce((a, ob) => a += ob.length, 0), 0);

      var unitQty = 1
      //Casing Dimension Supply Section
      var sl = supplyLengthSum
      var sh = data.unitForm.supplyDimension[0].height
      var sw = data.unitForm.supplyDimension[0].width
      var ss = data.unitForm.supplyDimension.length

      //Casing Dimension Exhaust Section

      if (data.unitForm.exhaustDimension.length == 0) {
        var el = 0
        var eh = 0
        var ew = 0
        var es = 0
      } else {
        var el = exhaustLengthSum
        var eh = data.unitForm.exhaustDimension[0].height
        var ew = data.unitForm.exhaustDimension[0].width
        var es = data.unitForm.exhaustDimension.length
      }

      //Casing Sheet
      var iSheet = data.unitForm.innerSheet.Description;
      var oSheet = data.unitForm.outerSheet.Description;
      var panelThick = data.unitForm.panelThick;
      var insulationType = data.unitForm.insulation

      //Casing Calculation
      var area = formula.casingArea(sl, sh, sw, el, eh, ew);
      var iSheetWeight = formula.sheetWeight(iSheet, area);
      var oSheetWeight = formula.sheetWeight(oSheet, area);
      var cornerProfileLength = formula.cornerProfile(sl, sh, sw, el, eh, ew, ss, es)
      var omegaProfileLength = formula.omegaProfile(cornerProfileLength)
      var cornerProfileJoiners = formula.cornerJoiners()
      var omegaProfileJoiners = formula.omegaJoiners(ss, es)
      let insulation
      if (insulationType == 'puf') {
        insulation = formula.puf(panelThick, area)
      } else {
        insulation = area
      }
      var gasketQty = formula.gasketQty()
      var fastnersQty1 = formula.fastnersQty1(gasketQty)
      var fastnersQty2 = formula.fastnersQty2()


      var casing = {
        dimension: {
          supply: {
            length: sl,
            height: sh,
            width: sw,
            sections: ss
          },
          exhaust: {
            length: el,
            height: eh,
            width: ew,
            sections: es
          }
        },
        panel: {
          innerSheetThick: iSheet,
          outerSheetThick: oSheet,
          thickness: panelThick,
          innerSheetWeight: iSheetWeight,
          outerSheetWeight: oSheetWeight,
          cornerProfileLength: cornerProfileLength,
          omegaProfileLength: omegaProfileLength,
          cornerProfileJoiners: cornerProfileJoiners,
          omegaProfileJoiners: omegaProfileJoiners,
          area: area,
          insulation: insulation,
          gasketQty: gasketQty,
          fastnersQty1: fastnersQty1,
          fastnersQty2: fastnersQty2
        }
      }

      //Casing Calculation Ends


      //Fan Calculation Starts

      var antiVibrantQty = formula.antiVibrantQty();
      var fan = {
        antiVibrantQty: antiVibrantQty
      }
      //Fan Calculation Ends

      //Coil Calculation Starts
      var coilArray = data.coilForm.coils
      let coil = []
      coilArray.forEach(e => {
        var nTubes = e.nTubes
        var fl = e.finLength
        var fh = e.finHeight
        var nt = e.nTubes
        var rd = e.rowDeep
        var tdia = e.tubeDia
        var tDiaData = results[1][0]
        var finQty = formula.finQty(fh, fl, rd)
        var tubeQty = formula.finQty(nt, fl, rd)
        var casingWeight = formula.casingWeight(fh, fl, rd, tdia, tDiaData)
        var headerQty = formula.headerQty(fh)
        var uBendQty = formula.uBendQty(nt, rd)
        var stubQty = formula.stubQty(nt)
        var coilData = {
          nTubes: nTubes,
          finQty: finQty,
          tubeQty: tubeQty,
          casingWeight: casingWeight,
          headerQty: headerQty,
          uBendQty: uBendQty,
          stubQty: stubQty
        }
        coil.push(coilData)
      });

      var filter = {}


      var calcData = {
        casing: casing,
        coil: coil,
        fan: fan
      }


      let reportData = []

      var casingData = casingService.casing(data, casing, itemMaster, unitQty);
      var coilData = coilService.coil(data, coil, itemMaster, unitQty);
      var fanData = fanService.fan(data, fan, itemMaster, unitQty);
      var filterData = filterService.filter(data, filter, itemMaster, unitQty);

      casingData.forEach(e => {
        reportData.push(e)
      })
      fanData.forEach(e => {
        reportData.push(e)
      })
      coilData.forEach(e => {
        reportData.push(e)
      })
      filterData.forEach(e => {
        reportData.push(e)
      })
      return resolve(reportData);
    })
  },

  set: (data) => {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) throw err;
        var insertCustomer = "INSERT INTO `customers` SET ?";
        var values = {
          name: data.name,
          createdDate: data.createdDate,
          createdby: data.createdby
        };
        var insertCustomerAddress = "INSERT INTO `customer_address` SET ?";
        var query1 = "SELECT * FROM `customers`";
        var query2 = 'SELECT * FROM `customers` ORDER BY id DESC LIMIT 1;'
        connection.query(
          insertCustomer,
          values,
          (error, results1) => {
            connection.query(query2,
              (error, results2) => {
                var valuesRegion = {
                  customerId: results2[0].id,
                  salesEr: data.address.salesEr,
                  region: data.address.region
                };
                connection.query(insertCustomerAddress, valuesRegion,
                  (error, results3) => {
                    if (err) {
                      console.log(err);
                      return reject(err);
                    }
                    var results = [results1, results2, results3];
                    return resolve(results);
                  }
                );
              });
          }
        );
      })
    })
  },
};