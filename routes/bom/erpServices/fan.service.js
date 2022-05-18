var {
    fanBom
} = require('../template/fanBOM.json')
var {
    constants
} = require('../template/calculation.json');
module.exports = {
    fan: (data, fan, itemMaster, unitQty) => {

        let fanData = []

        let soNum = data?.unitForm?.soNum
        var supplyFan = data.fanForm?.supplyFan;
        var exhaustFan = data.fanForm?.exhaustFan;
        var supplyFanDia = supplyFan.fanModel?.Description;
        var ExhaustFanDia = exhaustFan.fanModel?.Description;
        var motorBases = itemMaster.filter(i => (i.Item_Group == 'MOTOR BASE')).filter(j => (j.Description != ''));


        let dataType = {
            SrNo: '',
            BOMType: '',
            Plant: '',
            Item_Code: '',
            Item_Name: '',
            BOMVariant: soNum,
            BaseQty: '',
            BaseUnit: '',
            ItemCode: '',
            ItemName: '',
            Qty: 0,
            Unit: '',
            ItemGroup: '',
            ItemType: '',
        }
        if (supplyFan.fanModel != null || supplyFan.motorModel != null) {
            var supplyFanModel = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: supplyFan.fanModel?.Code,
                ItemName: supplyFan.fanModel?.Name,
                Qty: (supplyFan.fanQty) * unitQty,
                Unit: supplyFan.fanModel?.Unit,
                ItemType: constants.itemType,
                ItemGroup: supplyFan.fanModel?.Item_Group,
            }

            var supplyMotorModel = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: supplyFan.motorModel?.Code,
                ItemName: supplyFan.motorModel?.Name,
                Qty: (supplyFan.motorQty) * unitQty,
                Unit: supplyFan.motorModel?.Unit,
                ItemType: constants.itemType,
                ItemGroup: supplyFan.motorModel?.Item_Group,
            }

            var _supplyMotorBase = motorBases.filter(i => (i.Description === supplyFan.motorModel?.Description))[0];
            // console.log(supplyFan.motorModel, _supplyMotorBase);
            var supplyMotorBase = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: _supplyMotorBase?.Code,
                ItemName: _supplyMotorBase?.Name,
                Qty: (supplyFan.motorQty) * unitQty,
                Unit: _supplyMotorBase?.Unit,
                ItemType: constants.itemType,
                ItemGroup: _supplyMotorBase?.Item_Group,
            }

            var supplyAntiVibrant = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: supplyFan.antiVibrant?.Code,
                ItemName: supplyFan.antiVibrant?.Name,
                Qty: (fan.antiVibrantQty) * unitQty,
                Unit: supplyFan.antiVibrant?.Unit,
                ItemType: constants.itemType,
                ItemGroup: supplyFan.antiVibrant?.Item_Group,
            }


            var supplyFanPulley = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: supplyFan.fanPulley?.Code,
                ItemName: supplyFan.fanPulley?.Name,
                Qty: (supplyFan.fanQty) * unitQty,
                Unit: supplyFan.fanPulley?.Unit,
                ItemType: constants.itemType,
                ItemGroup: supplyFan.fanPulley?.Item_Group,
            }

            var supplyMotorPulley = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: supplyFan.motorPulley?.Code,
                ItemName: supplyFan.motorPulley?.Name,
                Qty: (supplyFan.motorQty) * unitQty,
                Unit: supplyFan.motorPulley?.Unit,
                ItemType: constants.itemType,
                ItemGroup: supplyFan.motorPulley?.Item_Group,
            }

            var motorPulleyGroove = supplyFan.motorPulley?.Description.split('')[0]

            var supplyBelt = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: supplyFan.belt?.Code,
                ItemName: supplyFan.belt?.Name,
                Qty: (supplyFan.motorQty) * motorPulleyGroove * unitQty,
                Unit: supplyFan.belt?.Unit,
                ItemType: constants.itemType,
                ItemGroup: supplyFan.belt?.Item_Group,
            }

            fanData.push(supplyFanModel, supplyMotorModel, supplyMotorBase, supplyAntiVibrant, supplyFanPulley, supplyMotorPulley, supplyBelt);
            let supplyFanAccData = fanBom.filter(i => (i.fanDia === supplyFanDia));
            // delete supplyFanAccData[0]?.id;
            // delete supplyFanAccData[0]?.fanDia;
            if (supplyFanAccData[0] != undefined || supplyFanAccData[0] != null) {
                var objSupplyFan = Object.values(supplyFanAccData[0]);
                objSupplyFan.shift();
                objSupplyFan.shift();
                objSupplyFan.forEach(element => {
                    var itemCode = itemMaster.filter(i => (i.Code === element.code))[0]?.Code
                    var itemName = itemMaster.filter(i => (i.Code === element.code))[0]?.Name
                    var qty = element.qty;
                    var unit = itemMaster.filter(i => (i.Code === element.code))[0]?.Unit
                    var group = itemMaster.filter(i => (i.Code === element.code))[0]?.Item_Group
                    fanData.push({
                        SrNo: constants.SrNo,
                        BOMType: '',
                        Plant: constants.Plant,
                        Item_Code: '',
                        Item_Name: '',
                        BOMVariant: soNum,
                        BaseQty: '',
                        BaseUnit: '',
                        ItemCode: itemCode,
                        ItemName: itemName,
                        Qty: qty,
                        Unit: unit,
                        ItemType: constants.itemType,
                        ItemGroup: group,
                    });
                });
            }
        }


        if (exhaustFan.fanModel != null || exhaustFan.motorModel != null) {
            var exhaustFanModel = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: exhaustFan?.fanModel?.Code,
                ItemName: exhaustFan?.fanModel?.Name,
                Qty: (exhaustFan.fanQty) * unitQty,
                Unit: exhaustFan?.fanModel?.Unit,
                ItemType: constants.itemType,
                ItemGroup: exhaustFan?.fanModel?.Item_Group,
            }

            var exhaustMotorModel = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: exhaustFan?.motorModel?.Code,
                ItemName: exhaustFan?.motorModel?.Name,
                Qty: (exhaustFan.motorQty) * unitQty,
                Unit: exhaustFan.motorModel?.Unit,
                ItemType: constants.itemType,
                ItemGroup: exhaustFan?.motorModel?.Item_Group,
            }

            var _exhaustMotorBase = motorBases.filter(i => (i.Description === exhaustFan.motorModel?.Description))[0];
            var exhaustMotorBase = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: _exhaustMotorBase?.Code,
                ItemName: _exhaustMotorBase?.Name,
                Qty: (supplyFan.motorQty) * unitQty,
                Unit: _exhaustMotorBase?.Unit,
                ItemType: constants.itemType,
                ItemGroup: _exhaustMotorBase?.Item_Group,
            }


            var exhaustAntiVibrant = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: exhaustFan?.antiVibrant?.Code,
                ItemName: exhaustFan?.antiVibrant?.Name,
                Qty: (fan.antiVibrantQty) * unitQty,
                Unit: exhaustFan?.antiVibrant?.Unit,
                ItemType: constants.itemType,
                ItemGroup: exhaustFan?.antiVibrant?.Item_Group,
            }


            var exhaustFanPulley = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: exhaustFan?.fanPulley?.Code,
                ItemName: exhaustFan?.fanPulley?.Name,
                Qty: (exhaustFan.fanQty) * unitQty,
                Unit: exhaustFan?.fanPulley?.Unit,
                ItemType: constants.itemType,
                ItemGroup: exhaustFan?.fanPulley?.Item_Group,
            }

            var exhaustMotorPulley = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: exhaustFan?.motorPulley?.Code,
                ItemName: exhaustFan?.motorPulley?.Name,
                Qty: (exhaustFan?.motorQty) * unitQty,
                Unit: exhaustFan?.motorPulley?.Unit,
                ItemType: constants?.itemType,
                ItemGroup: exhaustFan?.motorPulley?.Item_Group,
            }

            var exhaustBelt = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: '',
                BaseQty: '',
                BaseUnit: '',
                ItemCode: exhaustFan?.belt?.Code,
                ItemName: exhaustFan?.belt?.Name,
                Qty: (exhaustFan.motorQty) * unitQty,
                Unit: exhaustFan?.belt?.Unit,
                ItemType: constants?.itemType,
                ItemGroup: exhaustFan?.belt?.Item_Group,
            }

            fanData.push(exhaustFanModel, exhaustMotorModel, exhaustMotorBase, exhaustAntiVibrant, exhaustFanPulley, exhaustMotorPulley, exhaustBelt)

            var exhaustFanAccData = fanBom.filter(i => (i.fanDia === ExhaustFanDia));

            // delete exhaustFanAccData[0]?.id;
            // delete exhaustFanAccData[0]?.fanDia;

            if (exhaustFanAccData[0] != undefined || exhaustFanAccData[0] != null) {
                var objExhaustFan = Object.values(exhaustFanAccData[0]);
                objExhaustFan.shift();
                objExhaustFan.shift();
                objExhaustFan.forEach(element => {
                    var itemCode = itemMaster.filter(i => (i.Code === element.code))[0].Code
                    var itemName = itemMaster.filter(i => (i.Code === element.code))[0].Name
                    var qty = element.qty;
                    var unit = itemMaster.filter(i => (i.Code === element.code))[0].Unit
                    fanData.push({
                        SrNo: constants.SrNo,
                        BOMType: '',
                        Plant: constants.Plant,
                        Item_Code: '',
                        Item_Name: '',
                        BOMVariant: soNum,
                        BaseQty: '',
                        BaseUnit: '',
                        ItemCode: itemCode,
                        ItemName: itemName,
                        Qty: qty,
                        Unit: unit,
                        ItemType: constants?.itemType,
                        ItemGroup: '',
                    });
                });
            }

        }
        return fanData
    }
}