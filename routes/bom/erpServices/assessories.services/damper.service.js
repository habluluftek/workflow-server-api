    var {constants} = require('../../template/calculation.json');

module.exports = {
    dampers : (data, dampersQty, itemMaster, unitQty) =>{
        var damperData = []
        let soNum = data?.unitForm?.soNum
    
        var damperPart = itemMaster.filter(i => (i.Sub_Group == 'DAMPER'));
        var bladeProfilePart = damperPart?.filter(i => (i.Description == 'Blade Profile'))[0];
        var endProfilePart = damperPart?.filter(i => (i.Description == 'End Profile'))[0];
        var verticalProfilePart = damperPart?.filter(i => (i.Description == 'Vertical Profile'))[0];
        var H_BushPart = damperPart?.filter(i => (i.Description == 'H-Bush'))[0];
        var bladeGasketPart = damperPart?.filter(i => (i.Description == 'Blade Gasket'))[0];
        var GearPart = damperPart?.filter(i => (i.Description == 'Gear'))[0];
        var handlePart = damperPart?.filter(i => (i.Description == 'Handle'))[0];
        var handlePlatePart = damperPart?.filter(i => (i.Description == 'Handle Plate'))[0];
        var leftPlatePart = damperPart?.filter(i => (i.Description == 'Left Plate'))[0];
        var rightPlatePart = damperPart?.filter(i => (i.Description == 'Right Plate'))[0];
        var roundBushPart = damperPart?.filter(i => (i.Description == 'Round Bush'))[0];
        var stopperStickPart = damperPart?.filter(i => (i.Description == 'Stopper Stick'))[0];
        var wingNutPart = damperPart?.filter(i => (i.Description == 'Wing Nut'))[0];
        var screwPart = damperPart?.filter(i => (i.Description == 'Screw'))[0];

        var damperPartQty = dampersQty?.reduce(function (pv, cv) {
            return {
                bladeProfile: pv.bladeProfile + cv.bladeProfile,
                endProfile: pv.endProfile + cv.endProfile,
                verticalProfile : pv.verticalProfile + cv.verticalProfile,
                H_Bush : pv.H_Bush + cv.H_Bush,
                bladeGasket : pv.bladeGasket + cv.bladeGasket,
                Gear : pv.Gear + cv.Gear,
                handle : pv.handle + cv.handle,
                handlePlate : pv.handlePlate + cv.handlePlate,
                leftPlate : pv.leftPlate + cv.leftPlate,
                rightPlate : pv.rightPlate + cv.rightPlate,
                roundBush : pv.roundBush + cv.roundBush,
                stopperStick : pv.stopperStick + cv.stopperStick,
                wingNut : pv.wingNut + cv.wingNut,
                screw : pv.screw + cv.screw,
            }
        });

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

        var bladeProfile  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: bladeProfilePart?.Code,
            ItemName: bladeProfilePart?.Name,
            Qty : (damperPartQty?.bladeProfile).toFixed(2) * unitQty,
            Unit: bladeProfilePart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: bladeProfilePart?.Item_Group,
        }
        // console.log(bladeProfile);
        var endProfile  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: endProfilePart?.Code,
            ItemName: endProfilePart?.Name,
            Qty : (damperPartQty?.endProfile).toFixed(2) * unitQty,
            Unit: endProfilePart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: endProfilePart?.Item_Group,
        }
        var verticalProfile  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: verticalProfilePart?.Code,
            ItemName: verticalProfilePart?.Name,
            Qty : (damperPartQty?.verticalProfile).toFixed(2) * unitQty,
            Unit: verticalProfilePart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: verticalProfilePart?.Item_Group,
        }
        var H_Bush  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: H_BushPart?.Code,
            ItemName: H_BushPart?.Name,
            Qty : (damperPartQty?.H_Bush)?.toFixed(2) * unitQty,
            Unit: H_BushPart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: H_BushPart?.Item_Group,
        }
        var bladeGasket  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: bladeGasketPart?.Code,
            ItemName: bladeGasketPart?.Name,
            Qty : (damperPartQty?.bladeGasket)?.toFixed(2) * unitQty,
            Unit: bladeGasketPart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: bladeGasketPart?.Item_Group,
        }
        var Gear  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: GearPart?.Code,
            ItemName: GearPart?.Name,
            Qty : (damperPartQty?.Gear)?.toFixed(2) * unitQty,
            Unit: GearPart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: GearPart?.Item_Group,
        }
        var handle  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: handlePart?.Code,
            ItemName: handlePart?.Name,
            Qty : (damperPartQty?.handle)?.toFixed(2) * unitQty,
            Unit: handlePart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: handlePart?.Item_Group,
        }
        var handlePlate  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: handlePlatePart?.Code,
            ItemName: handlePlatePart?.Name,
            Qty : (damperPartQty?.handlePlate)?.toFixed(2) * unitQty,
            Unit: handlePlatePart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: handlePlatePart?.Item_Group,
        }
        var leftPlate  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: leftPlatePart?.Code,
            ItemName: leftPlatePart?.Name,
            Qty : (damperPartQty?.leftPlate)?.toFixed(2) * unitQty,
            Unit: leftPlatePart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: leftPlatePart?.Item_Group,
        }
        var rightPlate  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: rightPlatePart?.Code,
            ItemName: rightPlatePart?.Name,
            Qty : (damperPartQty?.rightPlate)?.toFixed(2) * unitQty,
            Unit: rightPlatePart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: rightPlatePart?.Item_Group,
        }
        var roundBush  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: roundBushPart?.Code,
            ItemName: roundBushPart?.Name,
            Qty : (damperPartQty?.roundBush)?.toFixed(2) * unitQty,
            Unit: roundBushPart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: roundBushPart?.Item_Group,
        }
        var stopperStick  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: stopperStickPart?.Code,
            ItemName: stopperStickPart?.Name,
            Qty : (damperPartQty?.stopperStick)?.toFixed(2) * unitQty,
            Unit: stopperStickPart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: stopperStickPart?.Item_Group,
        }
        var wingNut  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: wingNutPart?.Code,
            ItemName: wingNutPart?.Name,
            Qty : (damperPartQty?.wingNut)?.toFixed(2) * unitQty,
            Unit: wingNutPart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: wingNutPart?.Item_Group,
        }
        var screw  = dataType = {
            SrNo: constants.SrNo,
            BOMType: '',
            Plant: constants.Plant,
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: screwPart?.Code,
            ItemName: screwPart?.Name,
            Qty : (damperPartQty?.screw)?.toFixed(2) * unitQty,
            Unit: screwPart?.Unit,
            ItemType: constants.itemType,
            ItemGroup: screwPart?.Item_Group,
        }

        damperData.push(
            bladeProfile,
            endProfile,
            verticalProfile,
            H_Bush,
            bladeGasket,
            Gear,
            handle,
            handlePlate,
            leftPlate,
            rightPlate,
            roundBush,
            stopperStick,
            wingNut,
            screw
            )
            
        return damperData
    }
}