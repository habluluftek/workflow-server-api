var {constants} = require('../template/calculation.json');
module.exports = {
    casing: (data, casing, itemMaster,unitQty) =>{

    let casingData = []
    
    let soNum = data?.unitForm?.soNum
    let dataType = {
            SrNo: '',
            BOMType: '',
            Plant: '',
            Item_Code: '',
            Item_Name: '',
            BOMVariant: '',
            BaseQty: '',
            BaseUnit: '',
            ItemCode: '',
            ItemName: '',
            Qty: 0,
            Unit: '',
            ItemGroup: '',
            ItemType: '',
        }

        var innerSkin = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: data.unitForm.innerSheet?.Code,
            ItemName: data.unitForm.innerSheet?.Name,
            Qty : (casing.panel.innerSheetWeight)*unitQty,
            Unit: data.unitForm.innerSheet?.Unit,
            ItemType: constants.itemType,
            ItemGroup: data.unitForm.innerSheet?.Item_Group,
        }

        var outerSkin = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: data.unitForm.outerSheet?.Code,
            ItemName: data.unitForm.outerSheet?.Name,
            Qty: (casing.panel.outerSheetWeight)*unitQty,
            Unit: data.unitForm.outerSheet?.Unit,
            ItemType: constants.itemType,
            ItemGroup: data.unitForm.outerSheet?.Item_Group,
        }
        var profiles = itemMaster.filter(i => (i.Item_Group === 'ALUMINIUM PROFILES'))
        profiles.forEach(e => {
            let string = e.Description;
            let array = string.split(';');
            e.Description = array
        })
        var cornerProfiles = profiles.filter(_ => _.Description.find(_ => _ == 'Corner Profile'))
        var omegaProfiles = profiles.filter(_ => _.Description.find(_ => _ == 'Omega Profile'))
        var cornerProfileData = cornerProfiles.filter(i => (i.Sub_Group === data.unitForm.profileType))[0];
        var omegaProfileData = omegaProfiles.filter(i => (i.Sub_Group === data.unitForm.profileType))[0];
        var cornerProfile = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: cornerProfileData?.Code,
            ItemName: cornerProfileData?.Name,
            Qty: (casing.panel.cornerProfileLength)*unitQty,
            Unit: cornerProfileData?.Unit,
            ItemType: constants.itemType,
            ItemGroup: cornerProfileData?.Item_Group,
        }
        
        var omegaProfile = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: omegaProfileData?.Code,
            ItemName: omegaProfileData?.Name,
            Qty: (casing.panel.omegaProfileLength)*unitQty,
            Unit: omegaProfileData?.Unit,
            ItemType: constants.itemType,
            ItemGroup: omegaProfileData?.Item_Group,
        }
        var plasticParts = itemMaster.filter(i => (i.Item_Group === 'PLASTIC PARTS'));
        var JoinerData = plasticParts.filter(i => (i.Sub_Group === data.unitForm.profileType));
        JoinerData.forEach(e => {
            let string = e.Description;
            let array = string.split(';');
            e.Description = array
        });
        var cornerJoiner = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: JoinerData.filter(_ => _.Description.find(_ => _ == 'Corner Joiner'))[0]?.Code,
            ItemName: JoinerData.filter(_ => _.Description.find(_ => _ == 'Corner Joiner'))[0]?.Name,
            Qty: (casing.panel.cornerProfileJoiners)*unitQty,
            Unit: JoinerData.filter(_ => _.Description.find(_ => _ == 'Corner Joiner'))[0]?.Unit,
            ItemType: constants.itemType,
            ItemGroup: JoinerData.filter(_ => _.Description.find(_ => _ == 'Corner Joiner'))[0]?.Item_Group,
        }
        
        var omegaJoiner = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: JoinerData.filter(_ => _.Description.find(_ => _ == 'Omega Joiner'))[0]?.Code,
            ItemName: JoinerData.filter(_ => _.Description.find(_ => _ == 'Omega Joiner'))[0]?.Name,
            Qty: (casing.panel.omegaProfileJoiners)*unitQty,
            Unit: JoinerData.filter(_ => _.Description.find(_ => _ == 'Omega Joiner'))[0]?.Unit,
            ItemType: constants.itemType,
            ItemGroup: JoinerData.filter(_ => _.Description.find(_ => _ == 'Omega Joiner'))[0]?.Item_Group,
        }
// console.log(JoinerData);
        casingData.push(innerSkin, outerSkin, cornerProfile, omegaProfile, cornerJoiner, omegaJoiner)
        
        var polyolPUF = itemMaster.filter(i => (i.Item_Group === 'POLYOL'));
        var isolPUF = itemMaster.filter(i => (i.Item_Group === 'ISO-CYNATE'));
        // console.log(data.unitForm.insulation);
        if (data.unitForm.insulation == 'puf') {

            var polyol = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: polyolPUF[0]?.Code,
                ItemName: polyolPUF[0]?.Name,
                Qty: (casing.panel.insulation.polyol) * unitQty,
                Unit: polyolPUF[0].Unit,
                ItemType: constants.itemType,
                ItemGroup: polyolPUF[0].Item_Group,
            }

            var isol = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: isolPUF[0]?.Code,
                ItemName: isolPUF[0]?.Name,
                Qty: (casing.panel.insulation.isol) * unitQty,
                Unit: isolPUF[0]?.Unit,
                ItemType: constants.itemType,
                ItemGroup: isolPUF[0]?.Item_Group,
            }

            casingData.push(polyol, isol)
        } else {
            var rockwool = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: '',
                ItemName: 'Rockwool/GlassFiber',
                Qty: (casing.panel.area) * unitQty,
                Unit: 'sqMts',
                ItemType: constants.itemType,
                ItemGroup: '',
            }

            casingData.push(rockwool)
        }

        
        var gasketData = itemMaster.filter(i => (i.Item_Group === 'GASKET & INSULATION'));
        var fastnersData = itemMaster.filter(i => (i.Item_Group === 'FASTENERS'));
        var gasket_panel = gasketData.filter(i => (i.Sub_Group === 'Panel'));
        var gasket_door_panel = gasketData.filter(i => (i.Sub_Group === 'Door Panel'));
        var fastners_panel = fastnersData.filter(i => (i.Sub_Group === 'Panel'));
        var extraSheetData = itemMaster.filter(i => (i.Code === 'LCCR07503' || i.Code === 'LCCR07505'));

        var gasket = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: gasket_panel[0]?.Code,
            ItemName: gasket_panel[0]?.Name,
            Qty: (casing.panel.gasketQty)*unitQty,
            Unit: gasket_panel[0]?.Unit,
            ItemType: constants.itemType,
            ItemGroup: gasket_panel[0]?.Item_Group,
        }
        var gasket_doors = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: gasket_panel[0]?.Code,
            ItemName: gasket_panel[0]?.Name,
            Qty: (casing.panel.gasketQty) * unitQty,
            Unit: gasket_panel[0]?.Unit,
            ItemType: constants.itemType,
            ItemGroup: gasket_panel[0]?.Item_Group,
        }
        var fastners1 = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: fastners_panel[0]?.Code,
            ItemName: fastners_panel[0]?.Name,
            Qty: Math.round(((parseFloat(casing.panel.cornerProfileLength) + parseFloat(casing.panel.omegaProfileLength)) * 2) / 0.25) * unitQty,
            Unit: fastners_panel[0]?.Unit,
            ItemType: constants.itemType,
            ItemGroup: fastners_panel[0]?.Item_Group,
        }
        var fastners2 = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: fastners_panel[1]?.Code,
            ItemName: fastners_panel[1]?.Name,
            Qty: 100*unitQty,
            Unit: fastners_panel[1]?.Unit,
            ItemType: constants.itemType,
            ItemGroup: fastners_panel[1]?.Item_Group,
        }
        var fastners3 = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: fastners_panel[2]?.Code,
            ItemName: fastners_panel[2]?.Name,
            Qty: 20*unitQty,
            Unit: fastners_panel[2]?.Unit,
            ItemType: constants.itemType,
            ItemGroup: fastners_panel[2]?.Item_Group,
        }
        var fastners4 = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: fastners_panel[3]?.Code,
            ItemName: fastners_panel[3]?.Name,
            Qty: 20 * unitQty,
            Unit: fastners_panel[3]?.Unit,
            ItemType: constants.itemType,
            ItemGroup: fastners_panel[3]?.Item_Group,
        }

        var extraSheet1 = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: extraSheetData[0]?.Code,
            ItemName: extraSheetData[0]?.Name,
            Qty: 10 * unitQty,
            Unit: extraSheetData[0]?.Unit,
            ItemType: constants.itemType,
            ItemGroup: extraSheetData[0]?.Item_Group,
        }

        var extraSheet2 = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: extraSheetData[1]?.Code,
            ItemName: extraSheetData[1]?.Name,
            Qty: 15 * unitQty,
            Unit: extraSheetData[1]?.Unit,
            ItemType: constants.itemType,
            ItemGroup: extraSheetData[1]?.Item_Group,
        }

        casingData.push(
            gasket, 
            fastners1, 
            fastners2,
            fastners3,
            fastners4,
            extraSheet1,
            extraSheet2
            )



        return casingData
    }
}