var formula = require('../../../template/formula');

module.exports = {
    casing : (data) => {
        //Casing Calculation Starts
            // console.log(itemMaster.filter(i => (i.id == 21)));
            var supplyLength = {
              sl: data.unitForm.supplyDimension
            };
            var exhaustLength = {
              el: data.unitForm.exhaustDimension
            };
            const supplyLengthSum = Object.values(supplyLength).reduce((a, v) => a += v.reduce((a, ob) => a += ob.length, 0), 0);
            const exhaustLengthSum = Object.values(exhaustLength).reduce((a, v) => a += v.reduce((a, ob) => a += ob.length, 0), 0);

            //Casing Dimension Supply Section
            var sl = supplyLengthSum
            var sh = data.unitForm.supplyDimension[0]?.height
            var sw = data.unitForm.supplyDimension[0]?.width
            var ss = data.unitForm.supplyDimension?.length

            //Casing Dimension Exhaust Section

            if (data.unitForm.exhaustDimension.length == 0) {
              var el = 0
              var eh = 0
              var ew = 0
              var es = 0
            } else {
              var el = exhaustLengthSum
              var eh = data.unitForm?.exhaustDimension[0]?.height
              var ew = data.unitForm?.exhaustDimension[0]?.width
              var es = data.unitForm.exhaustDimension?.length
            }

            //Casing Sheet
            var iSheet = data.unitForm?.innerSheet?.Description;
            var oSheet = data.unitForm?.outerSheet?.Description;
            var panelThick = data.unitForm?.panelThick;
            var insulationType = data.unitForm?.insulation

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
            // console.log(casing);
            return casing
    }
}