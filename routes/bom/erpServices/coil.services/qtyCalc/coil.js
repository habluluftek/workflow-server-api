var formula = require('../../../template/formula');

module.exports = {
  coil: (data, bomMenu) => {
    var coilArray = data.coilForm.coils
    let coil = []
    coilArray.forEach(e => {
      // console.log(e.distributors, 'Passes');
      var nTubes = e.nTubes
      var fl = e.finLength
      var fh = e.finHeight
      var nCircuit = e.circuit
      var coilType = e.coilType?.Description
      var headerMaterial = e.headerMaterial;
      console.log(nCircuit, 'nCircuit');
      // var nt = e.nTubes
      var rd = e.rowDeep
      var tdia = e.tubeMaterial
      var tDiaData = bomMenu
      var circuits = bomMenu.filter(i => (i.menuId == 9));
      var coilArea = formula.coilArea(fh, fl, rd);
      // console.log(coilType, 'coilType');
      var finQty = formula.finQty(fh, fl, rd, coilArea, tdia);
      var holesQty = formula.passesQty(fh, tDiaData, tdia);
      var passesCHW = holesQty * nCircuit;
      console.log(passesCHW, 'passesCHW');
      var tubeQty = formula.tubeQty(holesQty, fl, rd, coilArea, tdia);
      var casingWeight = formula.casingWeight(fh, fl, rd, tdia, tDiaData);
      var bendQty = formula.bendQty(holesQty, rd, circuits, nCircuit);
      var stubQty = formula.stubQty(passesCHW);
      var distributors = e.distributors;
      let distrQty = []
      let headerQty = 0
      let silverBrazingRodQty = 0;
      let copperBrazingRodQty = 0;
      let distributorInletQty = 0;
      let stubQtyDX = 0;
      if (coilType == 'Refrigerant') {
        distributors.forEach(f => {
          var inletQty = formula.distributorHeader(tDiaData, tdia, f.passes);
          distrQty.push(inletQty)
          headerQty = distrQty
          copperBrazingRodQty += formula.copperBrazingRodQtyDX(rd, holesQty)
          if (f.distributor?.Description <= 20) {
            // console.log(f.distributor?.Description, 'Less than 20');
            silverBrazingRodQty += 0.025
          } else {
            // console.log(f.distributor?.Description, 'Greater than 20');
            silverBrazingRodQty += 0.05
          }
distributorInletQty += formula.distributorInletQty(fh, f.passes);
stubQtyDX += formula.stubQtyDX(f.passes);
        });
        // var copperBrazingRodQty = formula.copperBrazingRodQtyDX(headerMaterial, rd, holesQty);
        // console.log(headerQty, 'dx');
      } else {
        copperBrazingRodQty += formula.copperBrazingRodQtyCHW(headerMaterial,rd, holesQty)
        headerQty = formula.headerQty(fh);
        silverBrazingRodQty = formula.silverBrazingRodQtyCHW(headerMaterial, rd, holesQty)
        // silverBrazingRodQty
        // console.log(headerQty, 'CHW');
      }
      var eliminatorBladeQty = formula.eliminatorBlades(fl, fh);
      var eliminatorCombQty = formula.eliminatorCombs(fl);
      // console.log(holesQty, 'holesQty');
      var coilData = {
        nTubes: nTubes,
        finQty: finQty,
        tubeQty: tubeQty,
        holesQty: holesQty,
        casingWeight: casingWeight,
        headerQty: headerQty,
        bendQty: bendQty,
        stubQty: stubQty, stubQtyDX,
        distributorInletQty: distributorInletQty,
        silverBrazingRodQty: silverBrazingRodQty,
        copperBrazingRodQty: copperBrazingRodQty,
        eliminatorBladeQty: eliminatorBladeQty,
        eliminatorCombQty: eliminatorCombQty
      }
      coil.push(coilData)
    });
    // console.log(coil[0].passesQty, 'No. of Passes');
    return coil;
  }
}