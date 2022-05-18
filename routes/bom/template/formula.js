var {
    casing,
    fan,
    coil,
    damper,
    conversion
} = require('./calculation.json');
module.exports = {
    // Casing Calculation Formula Functions ---Starts--- //
    casingArea: (sl, sh, sw, el, eh, ew) => {
        var mConv = conversion.MMtoM
        var s1 = ((sl * mConv) * (sw * mConv)) * 2
        var s2 = ((sl * mConv) * (sh * mConv)) * 2
        var s3 = ((sh * mConv) * (sw * mConv)) * 2
        var s = s1 + s2 + s3
        var e1 = ((el * mConv) * (ew * mConv)) * 2
        var e2 = ((el * mConv) * (eh * mConv)) * 2
        var e3 = ((eh * mConv) * (ew * mConv)) * 2
        var e = e1 + e2 + e3
        var area = (s + e)
        return area.toFixed(2)
    },
    sheetWeight: (thick = 0, area = 0) => {
        var density = casing.GISheetDensity
        var wastage = casing.sheetWastage
        var sheetWeight = thick * area * density * wastage
        return sheetWeight.toFixed(2)
    },
    cornerProfile: (sl, sh, sw, el, eh, ew, ss, es) => {
        var sides = casing.cubeSides
        var mConv = conversion.MMtoM
        var s1 = ((sl * mConv) * sides)
        var s2 = ((sh * mConv) * sides * ss)
        var s3 = ((sw * mConv) * sides * ss)
        var s = s1 + s2 + s3
        var e1 = ((el * mConv) * sides)
        var e2 = ((eh * mConv) * sides * es)
        var e3 = ((ew * mConv) * sides * es)
        var e = e1 + e2 + e3
        var cornerProfileLength = (s + e)
        return cornerProfileLength.toFixed(2)
    },
    omegaProfile: (opl) => {
        var oProfileAmt = casing.omegaProfileAmt
        var omegaProfileLength = (opl * oProfileAmt)
        return omegaProfileLength.toFixed(2)
    },
    cornerJoiners: () => {
        var corners = casing.cubeCorners
        return corners
    },
    omegaJoiners: (ss, es) => {
        var corners = casing.crossSectionCorners
        var omegaJoiners = corners * (ss + es)
        return omegaJoiners
    },
    puf: (pthick, area) => {
        var chemDens = casing.pufChemicalDensity
        var pRatio = casing.polyolRatio
        var iRatio = casing.isolRatio
        var wastage = casing.pufChemicalWastage
        var mConv = conversion.MMtoM
        var pthickM = pthick * mConv
        var isol = area * chemDens * pthickM * pRatio * wastage
        var polyol = area * chemDens * pthickM * iRatio * wastage
        return {
            polyol: polyol.toFixed(2),
            isol: isol.toFixed(2)
        }
    },
    gasketQty: () => {
        var gasketQty = casing.gasketQty
        return gasketQty
    },
    fastnersQty1: (gasketQty) => {
        var fastnersQty1 = gasketQty * casing.fastnersQty1
        return Math.round(fastnersQty1)
    },
    fastnersQty2: () => {
        var fastnersQty2 = casing.fastnersQty2
        return fastnersQty2
    },
    // Casing Calculation Formula Functions ---Ends--- //


    // Fan Calculation Formula Functions ---Starts--- //
    antiVibrantQty: () => {
        var antiVibrantQty = fan.fanSeatingCorners;
        return antiVibrantQty
    },
    // Fan Calculation Formula Functions ---Ends--- //


    // Coil Calculation Formula Functions ---Starts--- //
    coilArea: (fh, fl, rd) => {
        var mConv = conversion.MMtoM
        var areaFactor = coil.areaFactor
        var coilArea = (fh * mConv) * (fl * mConv) * rd * areaFactor
        return coilArea
    },
    finQty: (fh, fl, rd, coilArea, tDia) => {
        let finQty
        var mConv = conversion.MMtoM
        var fHeight = fh * mConv
        var flength = fl * mConv
        var f1 = coil.fin_f1
        var f2 = coil.fin_f2
        var half = coil.halfIntoMM

        var halfFactor = coil.halfInFactoryFin
        var threeEigthFactor = coil.threeEigthInFactoryFin

        var dia = tDia?.Description
        if (dia == half) {
            finQty = coilArea * halfFactor
        } else {
            finQty = coilArea * threeEigthFactor
        }
        // finQty = fHeight * flength * rd * f1 * f2
        return finQty.toFixed(2)
    },
    passesQty: (fh, tDiaData, tDia) => {
        var tGeometry = tDiaData.filter(i => (i.value == tDia?.Description))[0]?.specValue
        var passesQty = fh / tGeometry;
        return Math.round(passesQty);
    },
    distributorHeader: (tDiaData, tDia, passes) => {
        var tGeometry = tDiaData.filter(i => (i.value == tDia?.Description))[0]?.specValue
        var length = (passes * tGeometry) + 305;
        return Math.round(length);
    },
    tubeQty: (nt, fl, rd, coilArea, tDia) => {
        let tubeQty
        var mConv = conversion.MMtoM
        var flength = fl * mConv
        var f1 = coil.fin_f1
        var f2 = coil.fin_f2

        var half = coil.halfIntoMM

        var halfFactor = coil.halfInFactoryTube
        var threeEigthFactor = coil.threeEigthInFactoryTube

        var dia = tDia?.Description

        if (dia == half) {
            tubeQty = coilArea * halfFactor
        } else {
            tubeQty = coilArea * threeEigthFactor
        }
        // tubeQty = nt * flength * rd * f1 * f2


        return tubeQty.toFixed(2)
    },
    casingWeight: (fh, fl, rd, tDia, tDiaData) => {
        var mConv = conversion.MMtoM
        var fHeight = fh * mConv
        var flength = fl * mConv
        var tGeometry = tDiaData.filter(i => (i.value == tDia?.Description))[0]?.specValue
        // console.log(tGeometry, 'tGeometry');
        var n_tbEndPlates = coil.topBottomEndPlates
        var n_sEndPlates = coil.sideEndPlates
        var densityGI = coil.GISheetDensity
        var densitySS = coil.SSSheetDensity
        var wastage = coil.sheetWastage
        var tb_EP_area = (((rd * tGeometry) * flength) * mConv) * n_tbEndPlates
        var s_EP_area = (((rd * tGeometry) * fHeight) * mConv) * n_sEndPlates
        //Final Formula
        var casingWeight = (tb_EP_area + s_EP_area) * densityGI * wastage
        return casingWeight.toFixed(2)
    },
    headerQty: (fh) => {
        var mConv = conversion.MMtoM
        var fHeight = fh * mConv
        var hF1 = coil.hQty1
        var hF2 = coil.hQty2 * mConv
        var hF3 = coil.hQty3
        var headerQty = ((fHeight * hF1) + hF2) * (hF3)
        // console.log(`headerQty : ${headerQty}`);
        return headerQty.toFixed(2)
    },
    bendQty: (nt, rd, circuits, nc) => {
        // var selectCircuit = circuits.filter(i => (i.specValue == nc))[0];
        // var bends = selectCircuit.value.split(';')
        var uBendF1 = coil.uBendF1
        var uBendF2 = coil.uBendF2
        var uBendF3 = coil.uBendF3
        let uBend, cBend, sBend;
        switch (nc) {
            case 0.5:
                console.log(nt);
                uBend = Math.round((2 * rd - 1) * (nt * (nc / 1)));
                cBend = 0;
                sBend = 0;
                break;
            case 1:
                uBend = Math.round((1 * rd - 1) * (nt * (nc / 1)));
                cBend = 0;
                sBend = 0;
                break;
            case 2:
                uBend = 0;
                cBend = Math.round((1 * rd - 2) * (nt));
                sBend = Math.round(2 * nt);
                break;
            case 1.5:
                uBend = Math.round((1 * rd - 1) * (nt * (nc / 3)));
                cBend = Math.round((1 * rd - 2) * (nt * (nc / 3)));
                sBend = Math.round(1 * nt);
                break;
            case 0.75:
                // console.log('uBend 0.75',Math.round(((nt/2)*(rd-1))+((nt/4)*((rd*2)-1))));
                uBend = Math.round(Math.round(((nt / 2) * (rd - 1)) + ((nt / 4) * ((rd * 2) - 1))));
                cBend = 0;
                sBend = 0;
                break;

            default:
                break;
        }
        var bendQty = {
            uBend,
            cBend,
            sBend
        }
        return bendQty
    },
    stubQty: (passes) => {
        // var stubF1 = coil.stubF1
        // var stubF2 = coil.stubF2
        var stubQty = passes * 2 * 0.0118
        return stubQty
    },
    stubQtyDX: (passes) => {
        var stubQty = passes * 0.0088;
        return stubQty
    },
    distributorInletQty: (fh,passes) => {
        let qty;
        qty = fh * passes * 0.000091;
        return qty
    },
    copperBrazingRodQtyDX: (rd, nt) => {
        let qty;
        var bend = rd * nt * 2 * (1.25 / 1000);
        var header = nt * 2 * (1.25 / 1000);
        qty = bend + header
        return qty;
    },
    silverBrazingRodQtyDX: (rd, nt) => {
        let qty;
        return qty;
    },
    copperBrazingRodQtyCHW: (header, rd, nt) => {
        let qty;
        console.log(header?.Name);
        if (header?.Description.find(i => i == 'MS')) {
            var bend = rd * nt * 2 * (1.25 / 1000);
            qty = bend;
            console.log('MS = ' + qty);
        } else {
            var bend = rd * nt * 2 * (1.25 / 1000);
            var header = nt * 2 * (1.25 / 1000);
            qty = bend + header
            console.log('CU = ' + qty);
        }
        return qty;
    },
    silverBrazingRodQtyCHW: (header, rd, nt) => {
        let qty;
        if (header?.Description.find(i => i == 'MS')) {
            qty = 0.12
        } else {
            if (header?.Description.find(i => i == ('1' || '1 1/2'))) {
                qty = 0.04
            } else {
                qty = 0.06
            }
        }
        return qty;
    },

    eliminatorBlades: (fl, fh) => {
        var finHeight = fh * conversion.MMtoM
        var blades = fl / coil.eliminatorPitch
        var eliminatorBlades = (finHeight * blades) / coil.eliminatorBladeLength
        return Math.round(eliminatorBlades)
    },
    eliminatorCombs: (fl) => {
        var eliminatorCombs = (fl * conversion.MMtoM) * 6
        return eliminatorCombs
    },
    // Coil Calculation Formula Functions ---Ends--- //

    //Accessories

    //Damper Caluculation Forumula Functions ----Start---- //
    bladeProfile: (dh, dw, dQty) => {
        var bladeProfileClearance = damper.bladeProfileClearance;
        var MMtoM = conversion.MMtoM;
        var MMtoCM = conversion.MMtoCM;
        var bladeProfile = (((dw - bladeProfileClearance) * (Math.round(dh * MMtoCM))) * MMtoM) * dQty;
        return bladeProfile
    },
    endProfile: (dw, dQty) => {
        var endProfileClearance = damper.endProfileClearance;
        var endProfileQty = damper.endProfileQty;
        var MMtoM = conversion.MMtoM;

        var endProfile = (((dw + endProfileClearance) * endProfileQty) * MMtoM) * dQty
        return endProfile
    },
    verticalProfile: (dh, dQty) => {
        var verticalProfileQty = damper.verticalProfileQty;
        var MMtoM = conversion.MMtoM;

        var verticalProfile = ((dh * verticalProfileQty) * MMtoM) * dQty
        return verticalProfile
    },
    hBush: (dh, dQty) => {
        var verticalProfileQty = damper.verticalProfileQty;
        var MMtoCM = conversion.MMtoCM;
        var hBush = Math.round(dh * MMtoCM) * verticalProfileQty * dQty;
        return hBush
    },
    stopperStick: (dQty) => {
        var stopperStickQty = damper.stopperStickQty;

        var stopperStick = dQty * stopperStickQty;

        return stopperStickQty;
    },
    screws: (dQty) => {
        var screwQty = damper.screwQty;

        var screws = dQty * screwQty;

        return screws;
    }
    //Damper Caluculation Forumula Functions ----End---- //

    //Door Caluculation Forumula Functions ----Start---- //

    //Door Caluculation Forumula Functions ----End---- //
}