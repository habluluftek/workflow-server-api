 calculationWorkbook.xlsx.readFile(path.join(__dirname, 'template/calculation.xlsx')).then(() => {
      
      var casing = calculationWorkbook.getWorksheet(1);
      casing.getCell('A2').value = data.unitForm.innerSheet.Description;
      casing.getCell('B2').value = data.unitForm.outerSheet.Description;
      var supplyLength = { sl: data.unitForm.supplyDimension };
      var exhaustLength = { el: data.unitForm.exhaustDimension };
      const supplyLengthSum = Object.values(supplyLength).reduce((a, v) => a += v.reduce((a, ob) => a += ob.length, 0), 0);
      const exhaustLengthSum = Object.values(exhaustLength).reduce((a, v) => a += v.reduce((a, ob) => a += ob.length, 0), 0);

      casing.getCell('C2').value = supplyLengthSum;
      casing.getCell('D2').value = data.unitForm.supplyDimension[0].height;
      casing.getCell('E2').value = data.unitForm.supplyDimension[0].width;
       if (exhaustLengthSum == '00') {
        casing.getCell('G2').value = 00;
      } else { casing.getCell('G2').value = exhaustLengthSum; }
      // console.log(exhaustLengthSum);
      let eDh; let eDw;
      if (data.unitForm.exhaustDimension[0].height == "") {
        eDh = 00;
      } else { eDh = data.unitForm.exhaustDimension[0].height }
      if (data.unitForm.exhaustDimension[0].width == "") {
        eDw = 00;
      } else { eDw = data.unitForm.exhaustDimension[0].width }

      casing.getCell('H2').value = eDh;
      casing.getCell('I2').value = eDw;
      casing.getCell('F2').value = data.unitForm.supplyDimension.length;
      casing.getCell('J2').value = data.unitForm.exhaustDimension.length;
      if (data.unitForm.panelThick == '') { casing.getCell('K2').value = 00 } else {
        casing.getCell('K2').value = data.unitForm.panelThick;
      }

      calculationWorkbook.xlsx.writeFile(path.join(__dirname, 'template/calculation.xlsx'));
      
      parserCasing.on('callCellValue', function (cellCoord, done) {
        if (casing.getCell(cellCoord.label).formula) {
          done(parser.parse(casing.getCell(cellCoord.label).formula).result);
        } else {
          done(casing.getCell(cellCoord.label).value);
        }
      });

      parserCasing.on('callRangeValue', function (startCellCoord, endCellCoord, done) {
        var fragment = [];

        for (var row = startCellCoord.row.index; row <= endCellCoord.row.index; row++) {
          var colFragment = [];
          

          for (var col = startCellCoord.column.index; col <= endCellCoord.column.index; col++) {
            colFragment.push(casing.getRow(row + 1).getCell(col + 1).value);
          }

          fragment.push(colFragment);
        }

        if (fragment) {
          done(fragment);
        }
      });
      
      // var testVar = ws.getCell
      var area = getCellResult(casing, 'L2');
      var isw = getCellResult(casing, 'M2');
      var osw = getCellResult(casing, 'N2');
      var O = getCellResult(casing, 'O2');
      var P = getCellResult(casing, 'P2');
      var Q = getCellResult(casing, 'Q2');
      var R = getCellResult(casing, 'R2');
      
      let wbCalculation = XLSX.readFile(path.join(__dirname, 'template/calculation.xlsx'));
      let wsCasing = wbCalculation.Sheets['Casing'];
      let wsCoil = wbCalculation.Sheets['Coil'];
      calcdata = XLSX.utils.sheet_to_json(wsCasing);
      calcdata[0].area = area.toFixed(2)
      calcdata[0].inner_sheet_weight = (isw)
      calcdata[0].outer_sheet_weight = osw
      calcdata[0].corner_profile = O
      calcdata[0].omega_profile = P
      calcdata[0].polyol = Q
      calcdata[0].isol = R
      return resolve([ar,iSheetWeight,oSheetWeight,cornerProfileLength,omegaProfileLength,puf])
    })