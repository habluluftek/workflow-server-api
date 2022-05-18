var {
  constants
} = require("../template/calculation.json");
var calc = require("../template/calculation.json");
var distributorAcc = require("../template/distributorAcc.json");
var calcConst = require('../template/calculation.json');
module.exports = {
  coil: (data, coil, itemMaster, unitQty) => {
    var coilBodyData = data.coilForm.coils;
    let coilData = [];

    let soNum = data?.unitForm?.soNum;
    let unitType = data?.unitForm?.type;
    var U_bend_data = itemMaster.filter((i) => i.Sub_Group === "U_Bend");
    U_bend_data.forEach(e => {
      let string = e.Description;
      let array = string.split(';');
      e.Description = array
    })
    var C_bend_data = itemMaster.filter((i) => i.Sub_Group === "C_Bend");
    C_bend_data.forEach(e => {
      let string = e.Description;
      let array = string.split(';');
      e.Description = array
    })
    var S_bend_data = itemMaster.filter((i) => i.Sub_Group === "S_Bend");
    S_bend_data.forEach(e => {
      let string = e.Description;
      let array = string.split(';');
      e.Description = array
    })
    var cu_tubes = itemMaster.filter((i) => i.Sub_Group === "COPPER TUBE");
    var brazingRods = itemMaster.filter((i) => i.Sub_Group === "Brazing Rod");
    var drainPlug_data = itemMaster.filter((i) => i.Sub_Group === "COIL DRAIN");
    var drainTray = itemMaster.filter((i) => i.Sub_Group === "Drain Tray");
    var drainTrayData = drainTray.forEach(e => {
      let string = e.Description;
      let array = string.split(';');
      e.Description = array
    })
    var purge = itemMaster.filter((i) => i.Sub_Group === "COIL PURGE");
    var distributorInletData = itemMaster.filter((i) => i.Sub_Group === "DISTRIBUTOR INLET");
    var stubData = itemMaster.filter((i) => i.Sub_Group === "STUB");
    var eliminatorComb = itemMaster
      .filter((i) => i.Sub_Group == "Eliminator")
      .filter((j) => j.Description == "Comb");

    let dataType = {
      SrNo: "",
      BOMType: "",
      Plant: "",
      Item_Code: "",
      Item_Name: "",
      BOMVariant: "",
      BaseQty: "",
      BaseUnit: "",
      ItemCode: "",
      ItemName: "",
      Qty: 0,
      Unit: "",
      ItemType: "",
      ItemGroup: "",
    };
    for (let i = 0; i < coilBodyData.length; i++) {
      let nHeaders;
      var tDia = coilBodyData[i]?.tubeMaterial?.Description;
      //(_ => _.Description.find(_ => _ == tDia))
      var U_BendData = U_bend_data.filter(_ => _.Description.find(_ => _ == tDia));
      var C_BendData = C_bend_data.filter(_ => _.Description.find(_ => _ == tDia));
      var S_BendData = S_bend_data.filter(_ => _.Description.find(_ => _ == tDia));
      // console.log(coilBodyData[i].coilType);
      if (coilBodyData[i]?.coilType?.Description == "Refrigerant") {
        nHeaders = coilBodyData[i]?.distributors?.length;
        // console.log(nHeaders);
      } else {
        nHeaders = 1;
      }
      //Fin
      var fin = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: coilBodyData[i]?.finMaterial?.Code,
        ItemName: coilBodyData[i]?.finMaterial?.Name,
        Qty: coil[i]?.finQty * coilBodyData[i]?.qty * unitQty,
        Unit: coilBodyData[i]?.finMaterial?.Unit,
        ItemType: constants.itemType,
        ItemGroup: coilBodyData[i]?.finMaterial?.Item_Group,
      });
      //Tube
      var tube = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: coilBodyData[i]?.tubeMaterial?.Code,
        ItemName: coilBodyData[i]?.tubeMaterial?.Name,
        Qty: coil[i].tubeQty * coilBodyData[i]?.qty * unitQty,
        Unit: coilBodyData[i]?.tubeMaterial?.Unit,
        ItemType: constants.itemType,
        ItemGroup: coilBodyData[i]?.tubeMaterial?.Item_Group,
      });
      //Casing
      var casingCoil = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: coilBodyData[i]?.casingMaterial?.Code,
        ItemName: coilBodyData[i]?.casingMaterial?.Name,
        Qty: coil[i]?.casingWeight * coilBodyData[i]?.qty * unitQty,
        Unit: coilBodyData[i]?.casingMaterial?.Unit,
        ItemType: constants.itemType,
        ItemGroup: coilBodyData[i]?.casingMaterial?.Item_Group,
      });
      //Ubends
      var uBend = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: U_BendData[0]?.Code,
        ItemName: U_BendData[0]?.Name,
        Qty: coil[i].bendQty?.uBend * coilBodyData[i]?.qty * unitQty,
        Unit: U_BendData[0]?.Unit,
        ItemType: constants.itemType,
        ItemGroup: U_BendData[0]?.Item_Group,
      });
      //Cbends
      var cBend = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: C_BendData[0]?.Code,
        ItemName: C_BendData[0]?.Name,
        Qty: coil[i].bendQty?.cBend * coilBodyData[i]?.qty * unitQty,
        Unit: C_BendData[0]?.Unit,
        ItemType: constants.itemType,
        ItemGroup: C_BendData[0]?.Item_Group,
      });
      //Sbends
      var sBend = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: S_BendData[0]?.Code,
        ItemName: S_BendData[0]?.Name,
        Qty: coil[i].bendQty?.sBend * coilBodyData[i]?.qty * unitQty,
        Unit: S_BendData[0]?.Unit,
        ItemType: constants.itemType,
        ItemGroup: S_BendData[0]?.Item_Group,
      });
      //stub
      var stub = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: cu_tubes[1]?.Code,
        ItemName: cu_tubes[1]?.Name,
        Qty: coil[i].stubQty * coilBodyData[i]?.qty * unitQty,
        Unit: cu_tubes[1]?.Unit,
        ItemType: constants.itemType,
        ItemGroup: cu_tubes[1]?.Item_Group,
      });
      //drainTrayGroup
      //drainTraySheet
      const _drainTraySheet = drainTray.filter(i => i.Item_Group === 'SS SHEETS')
      var drainTraySheet = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: _drainTraySheet.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Code,
        ItemName: _drainTraySheet.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Name,
        Qty: coilBodyData[i]?.qty * unitQty,
        Unit: _drainTraySheet.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Unit,
        ItemType: constants.itemType,
        ItemGroup: _drainTraySheet.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Item_Group,
      })
      //ssNipple
      const _ssNipple = drainTray.filter(i => i.Item_Group === 'Material' || i.Item_Group === 'Hardware')
      var ssNipple = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: _ssNipple.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Code,
        ItemName: _ssNipple.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Name,
        Qty: coilBodyData[i]?.qty * unitQty,
        Unit: _ssNipple.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Unit,
        ItemType: constants.itemType,
        ItemGroup: _ssNipple.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Item_Group,
      })
      //drainInsulation1
      const _drainInsulation1 = drainTray.filter(i => i.Item_Group === 'GASKET & INSULATION')
      var drainInsulation1 = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: _drainInsulation1.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Code,
        ItemName: _drainInsulation1.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Name,
        Qty: coilBodyData[i]?.qty * unitQty,
        Unit: _drainInsulation1.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Unit,
        ItemType: constants.itemType,
        ItemGroup: _drainInsulation1.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Item_Group,
      })
      //drainInsulation2
      const _drainInsulation2 = drainTray.filter(i => i.Item_Group === 'GASKET & INSULATION')
      var drainInsulation2 = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: _drainInsulation2.filter(_ => _.Description.find(_ => _ == unitType))[1]?.Code,
        ItemName: _drainInsulation2.filter(_ => _.Description.find(_ => _ == unitType))[1]?.Name,
        Qty: coilBodyData[i]?.qty * unitQty,
        Unit: _drainInsulation2.filter(_ => _.Description.find(_ => _ == unitType))[1]?.Unit,
        ItemType: constants.itemType,
        ItemGroup: _drainInsulation2.filter(_ => _.Description.find(_ => _ == unitType))[1]?.Item_Group,
      })
      //Ubends
      // var drainPlug = (dataType = {
      //   SrNo: constants.SrNo,
      //   BOMType: "",
      //   Plant: constants.Plant,
      //   Item_Code: "",
      //   Item_Name: "",
      //   BOMVariant: soNum,
      //   BaseQty: "",
      //   BaseUnit: "",
      //   ItemCode: drainPlug_data[0]?.Code,
      //   ItemName: drainPlug_data[0]?.Name,
      //   Qty: coilBodyData[i]?.qty * unitQty,
      //   Unit: drainPlug_data[0]?.Unit,
      //   ItemType: constants.itemType,
      //   ItemGroup: drainPlug_data[0]?.Item_Group,
      // });
      //Hardwares
      const _Hardwares = drainTray.filter(i => i.Item_Group === 'FASTENERS')
      var Hardwares1 = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Code,
        ItemName: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Name,
        Qty: coilBodyData[i]?.qty * unitQty,
        Unit: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Unit,
        ItemType: constants.itemType,
        ItemGroup: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[0]?.Item_Group,
      })
      var Hardwares2 = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[1]?.Code,
        ItemName: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[1]?.Name,
        Qty: coilBodyData[i]?.qty * unitQty,
        Unit: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[1]?.Unit,
        ItemType: constants.itemType,
        ItemGroup: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[1]?.Item_Group,
      })
      var Hardwares3 = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[2]?.Code,
        ItemName: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[2]?.Name,
        Qty: coilBodyData[i]?.qty * unitQty,
        Unit: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[2]?.Unit,
        ItemType: constants.itemType,
        ItemGroup: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[2]?.Item_Group,
      })
      var Hardwares4 = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[3]?.Code,
        ItemName: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[3]?.Name,
        Qty: coilBodyData[i]?.qty * unitQty,
        Unit: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[3]?.Unit,
        ItemType: constants.itemType,
        ItemGroup: _Hardwares.filter(_ => _.Description.find(_ => _ == unitType))[3]?.Item_Group,
      })
      // console.log(purge, 'purge');
      var coilPurge = (dataType = {
        SrNo: constants.SrNo,
        BOMType: "",
        Plant: constants.Plant,
        Item_Code: "",
        Item_Name: "",
        BOMVariant: soNum,
        BaseQty: "",
        BaseUnit: "",
        ItemCode: purge[0]?.Code,
        ItemName: purge[0]?.Name,
        Qty: nHeaders * coilBodyData[i]?.qty * unitQty,
        Unit: purge[0]?.Unit,
        ItemType: constants.itemType,
        ItemGroup: purge[0]?.Item_Group,
      });

      coilData.push(fin, tube, casingCoil, coilPurge, drainTraySheet, ssNipple, drainInsulation1, drainInsulation2, Hardwares1, Hardwares2, Hardwares3, Hardwares4);
      // console.log('Bends', coil[i].bendQty);
      if (coil[i].bendQty?.uBend != 0) {
        coilData.push(uBend);
        // console.log('u', uBend);
      }
      if (coil[i].bendQty?.cBend != 0) {
        coilData.push(cBend);
        // console.log('c');
      }
      if (coil[i].bendQty?.sBend != 0) {
        coilData.push(sBend);
        // console.log('s');
      }
      if (coilBodyData[i]?.coilType?.Description == "Refrigerant") {
        var distributors = coilBodyData[i]?.distributors;
        let tJointQty = 0;
        let elbowQty = 0;
        let endCapQty = 0;
        distributors.forEach((e, index) => {
          var distributor = (dataType = {
            SrNo: constants.SrNo,
            BOMType: "",
            Plant: constants.Plant,
            Item_Code: "",
            Item_Name: "",
            BOMVariant: soNum,
            BaseQty: "",
            BaseUnit: "",
            ItemCode: e?.distributor?.Code,
            ItemName: e?.distributor?.Name,
            Qty: unitQty,
            Unit: e?.distributor?.Unit,
            ItemType: constants.itemType,
            ItemGroup: e?.distributor?.Item_Group,
          });
          var inlet = (dataType = {
            SrNo: constants.SrNo,
            BOMType: "",
            Plant: constants.Plant,
            Item_Code: "",
            Item_Name: "",
            BOMVariant: soNum,
            BaseQty: "",
            BaseUnit: "",
            ItemCode: e?.inlet?.Code,
            ItemName: e?.inlet?.Name,
            Qty: calc.coil.distributorInletHeader * calc.conversion.MMtoM,
            Unit: e?.inlet?.Unit,
            ItemType: constants.itemType,
            ItemGroup: e?.inlet?.Item_Group,
          });

          var outlet = (dataType = {
            SrNo: constants.SrNo,
            BOMType: "",
            Plant: constants.Plant,
            Item_Code: "",
            Item_Name: "",
            BOMVariant: soNum,
            BaseQty: "",
            BaseUnit: "",
            ItemCode: e?.outlet?.Code,
            ItemName: e?.outlet?.Name,
            Qty: coil[i].headerQty[index] * calc.conversion.MMtoM,
            Unit: e?.outlet?.Unit,
            ItemType: constants.itemType,
            ItemGroup: e?.outlet?.Item_Group,
          });


          coilData.push(distributor, inlet, outlet);
          let distributorAccDataInlet = distributorAcc.inlet.filter(
            (i) => i.HARDPIPES.CODE === e?.inlet?.Code
          );
          let distributorAccDataOutlet = distributorAcc.outlet.filter(
            (i) => i.HARDPIPES.CODE === e?.outlet?.Code
          );
          var objDistributorInlet = Object.values(distributorAccDataInlet[0]);
          var objDistributorOutlet = Object.values(distributorAccDataOutlet[0]);
          objDistributorInlet.shift();
          objDistributorOutlet.shift();
          // console.log(objDistributorInlet,'objDistributorInlet');

          objDistributorInlet.forEach((element) => {
            if (element.CODE != null) {
              var itemCode = itemMaster.filter(
                (i) => i.Code === element.CODE
              )[0]?.Code;
              var itemName = itemMaster.filter(
                (i) => i.Code === element.CODE
              )[0]?.Name;
              var qty = element.QTY;
              var unit = itemMaster.filter((i) => i.Code === element.CODE)[0]
                ?.Unit;
              var group = itemMaster.filter((i) => i.Code === element.CODE)[0]
                ?.Item_Group;
              // console.log(itemName, qty, 'itemName - inlet');
              elbowQty += qty;
              coilData.push({
                SrNo: constants.SrNo,
                BOMType: "",
                Plant: constants.Plant,
                Item_Code: "",
                Item_Name: "",
                BOMVariant: soNum,
                BaseQty: "",
                BaseUnit: "",
                ItemCode: itemCode,
                ItemName: itemName,
                Qty: qty,
                Unit: unit,
                ItemType: constants.itemType,
                ItemGroup: group,
              });
            }
          });
          tJointQty += objDistributorOutlet[0].QTY;
          endCapQty += objDistributorOutlet[1].QTY;
          objDistributorOutlet.forEach((element) => {
            if (element.CODE != null) {
              var itemCode = itemMaster.filter(
                (i) => i.Code === element.CODE
              )[0]?.Code;
              var itemName = itemMaster.filter(
                (i) => i.Code === element.CODE
              )[0]?.Name;
              var qty = element.QTY;
              var unit = itemMaster.filter((i) => i.Code === element.CODE)[0]
                ?.Unit;
              var group = itemMaster.filter((i) => i.Code === element.CODE)[0]
                ?.Item_Group;
              // tJointQty += qty;
              // elbowQty += qty;
              // console.log(itemName, qty, 'itemName - outlet');
              //   console.log(itemMaster.filter(i => (i.Code === element.CODE))[0],'itemCode');
              coilData.push({
                SrNo: constants.SrNo,
                BOMType: "",
                Plant: constants.Plant,
                Item_Code: "",
                Item_Name: "",
                BOMVariant: soNum,
                BaseQty: "",
                BaseUnit: "",
                ItemCode: itemCode,
                ItemName: itemName,
                Qty: qty,
                Unit: unit,
                ItemType: constants.itemType,
                ItemGroup: group,
              });
            }
          });


        });

        const silverBrazingRodData = brazingRods.filter(i => i.Description == 'Silver');
        const copperBrazingRodData = brazingRods.filter(i => i.Description == 'Copper');
        var silverBrazingRod = (dataType = {
          SrNo: constants.SrNo,
          BOMType: "",
          Plant: constants.Plant,
          Item_Code: "",
          Item_Name: "",
          BOMVariant: soNum,
          BaseQty: "",
          BaseUnit: "",
          ItemCode: silverBrazingRodData[0]?.Code,
          ItemName: silverBrazingRodData[0]?.Name,
          Qty: coil[i].silverBrazingRodQty * coilBodyData[i]?.qty * unitQty,
          Unit: silverBrazingRodData[0]?.Unit,
          ItemType: constants.itemType,
          ItemGroup: silverBrazingRodData[0]?.Item_Group,
        });
        // console.log('Copper Brazing Rod = ' + coil[i]?.copperBrazingRodQty , (elbowQty * calcConst.coil.brazingRodElbowDXF1) , (endCapQty * calcConst.coil.brazingRodEndCapDXF1) , (tJointQty * calcConst.coil.brazingRodTJointDXF1));
        var copperBrazingRod = (dataType = {
          SrNo: constants.SrNo,
          BOMType: "",
          Plant: constants.Plant,
          Item_Code: "",
          Item_Name: "",
          BOMVariant: soNum,
          BaseQty: "",
          BaseUnit: "",
          ItemCode: copperBrazingRodData[0]?.Code,
          ItemName: copperBrazingRodData[0]?.Name,
          Qty: (coil[i]?.copperBrazingRodQty + (elbowQty * calcConst.coil.brazingRodElbowDXF1) + (endCapQty * calcConst.coil.brazingRodEndCapDXF1) + (tJointQty * calcConst.coil.brazingRodTJointDXF1)) *
            coilBodyData[i]?.qty * unitQty,
          Unit: copperBrazingRodData[0]?.Unit,
          ItemType: constants.itemType,
          ItemGroup: copperBrazingRodData[0]?.Item_Group,
        });

        var distributorInlet = (dataType = {
          SrNo: constants.SrNo,
          BOMType: "",
          Plant: constants.Plant,
          Item_Code: "",
          Item_Name: "",
          BOMVariant: soNum,
          BaseQty: "",
          BaseUnit: "",
          ItemCode: distributorInletData[0]?.Code,
          ItemName: distributorInletData[0]?.Name,
          Qty: coil[i].distributorInletQty ,
          Unit: distributorInletData[0]?.Unit,
          ItemType: constants.itemType,
          ItemGroup: distributorInletData[0]?.Item_Group,
        });
        var stubDX = (dataType = {
          SrNo: constants.SrNo,
          BOMType: "",
          Plant: constants.Plant,
          Item_Code: "",
          Item_Name: "",
          BOMVariant: soNum,
          BaseQty: "",
          BaseUnit: "",
          ItemCode: stubData.filter(i => i.Description == 'DX')[0]?.Code,
          ItemName: stubData.filter(i => i.Description == 'DX')[0]?.Name,
          Qty: coil[i].stubQtyDX,
          Unit: stubData.filter(i => i.Description == 'DX')[0]?.Unit,
          ItemType: constants.itemType,
          ItemGroup: stubData.filter(i => i.Description == 'DX')[0]?.Item_Group,
        });
        coilData.push(stubDX, distributorInlet, copperBrazingRod, silverBrazingRod);
        // console.log(coilData);
      } else {
        // console.log(coilBodyData[i]?.headerMaterial?.Name);
        var headerCoil = (dataType = {
          SrNo: constants.SrNo,
          BOMType: "",
          Plant: constants.Plant,
          Item_Code: "",
          Item_Name: "",
          BOMVariant: soNum,
          BaseQty: "",
          BaseUnit: "",
          ItemCode: coilBodyData[i]?.headerMaterial?.Code,
          ItemName: coilBodyData[i]?.headerMaterial?.Name,
          Qty: coil[i]?.headerQty * coilBodyData[i]?.qty * unitQty,
          Unit: coilBodyData[i]?.headerMaterial?.Unit,
          ItemType: constants.itemType,
          ItemGroup: coilBodyData[i]?.headerMaterial?.Item_Group,
        });

        coilData.push(headerCoil);
        const silverBrazingRodData = brazingRods.filter(i => i.Description == 'Silver');
        const copperBrazingRodData = brazingRods.filter(i => i.Description == 'Copper');
        var silverBrazingRod = (dataType = {
          SrNo: constants.SrNo,
          BOMType: "",
          Plant: constants.Plant,
          Item_Code: "",
          Item_Name: "",
          BOMVariant: soNum,
          BaseQty: "",
          BaseUnit: "",
          ItemCode: silverBrazingRodData[0]?.Code,
          ItemName: silverBrazingRodData[0]?.Name,
          Qty: coil[i]?.silverBrazingRodQty * coilBodyData[i]?.qty * unitQty,
          Unit: silverBrazingRodData[0]?.Unit,
          ItemType: constants.itemType,
          ItemGroup: silverBrazingRodData[0]?.Item_Group,
        });
        var copperBrazingRod = (dataType = {
          SrNo: constants.SrNo,
          BOMType: "",
          Plant: constants.Plant,
          Item_Code: "",
          Item_Name: "",
          BOMVariant: soNum,
          BaseQty: "",
          BaseUnit: "",
          ItemCode: copperBrazingRodData[0]?.Code,
          ItemName: copperBrazingRodData[0]?.Name,
          Qty: coil[i]?.copperBrazingRodQty * coilBodyData[i]?.qty * unitQty,
          Unit: copperBrazingRodData[0]?.Unit,
          ItemType: constants.itemType,
          ItemGroup: copperBrazingRodData[0]?.Item_Group,
        });
        var stubCHW = (dataType = {
          SrNo: constants.SrNo,
          BOMType: "",
          Plant: constants.Plant,
          Item_Code: "",
          Item_Name: "",
          BOMVariant: soNum,
          BaseQty: "",
          BaseUnit: "",
          ItemCode: stubData.filter(i => i.Description == 'CHW')[0]?.Code,
          ItemName: stubData.filter(i => i.Description == 'CHW')[0]?.Name,
          Qty: coil[i].stubQty,
          Unit: stubData.filter(i => i.Description == 'CHW')[0]?.Unit,
          ItemType: constants.itemType,
          ItemGroup: stubData.filter(i => i.Description == 'CHW')[0]?.Item_Group,
        });
        console.log(copperBrazingRodData[0]?.Code);
        coilData.push(stubCHW, copperBrazingRod, silverBrazingRod);
      }
      if (coilBodyData[i]?.eliminator != null) {
        var eliminatorBlades = (dataType = {
          SrNo: constants.SrNo,
          BOMType: "",
          Plant: constants.Plant,
          Item_Code: "",
          Item_Name: "",
          BOMVariant: soNum,
          BaseQty: "",
          BaseUnit: "",
          ItemCode: coilBodyData[i]?.eliminator?.Code,
          ItemName: coilBodyData[i]?.eliminator?.Name,
          Qty: coil[i]?.eliminatorBladeQty * coilBodyData[i]?.qty * unitQty,
          Unit: coilBodyData[i]?.eliminator?.Unit,
          ItemType: constants.itemType,
          ItemGroup: coilBodyData[i]?.eliminator?.Item_Group,
        });

        var eliminatorCombs = (dataType = {
          SrNo: constants.SrNo,
          BOMType: "",
          Plant: constants.Plant,
          Item_Code: "",
          Item_Name: "",
          BOMVariant: soNum,
          BaseQty: "",
          BaseUnit: "",
          ItemCode: eliminatorComb[0]?.Code,
          ItemName: eliminatorComb[0]?.Name,
          Qty: coil[i]?.eliminatorCombQty * coilBodyData[i]?.qty * unitQty,
          Unit: eliminatorComb[0]?.Unit,
          ItemType: constants.itemType,
          ItemGroup: eliminatorComb[0]?.Item_Group,
        });
        coilData.push(eliminatorBlades, eliminatorCombs);
      }
    }

    return coilData;
  },
};