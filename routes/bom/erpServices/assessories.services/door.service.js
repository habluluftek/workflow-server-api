var doorAcc = require("../../template/doorAcc.json");
var {
    constants
} = require('../../template/calculation.json');
module.exports = {
    door: (data, itemMaster, unitQty) => {

        let soNum = data?.unitForm?.soNum
        var doorArr = data.accessoriesForm.doors;
        var profileType = data.unitForm.profileType;
        var panel = data?.unitForm?.panelThick
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
        var profiles = itemMaster.filter(i => (i.Item_Group === 'ALUMINIUM PROFILES'))
        profiles.forEach(e => {
            let string = e.Description;
            // console.log(e.Description,'e.des');
            // let array = string.split(';');
            // e.Description = array
        })
        // var cornerProfiles = profiles.filter(_ => _.Description.find(_ => _ == 'Corner Profile'))
        // var cornerProfileData = cornerProfiles.filter(i => (i.Sub_Group === profileType))[0];
        let doorData = [];
        doorArr.forEach(e => {
            var doorType = e.type;
            var doorQty = e.qty;
            var isViewPort = e.viewPort;
            var da = doorAcc.doors.filter(i => (i.type == doorType)).filter(j => (j.isViewPort == isViewPort))
            // var _da = da.filter(i => (i.panelThick == panel || 25))[0]
            var _da = da.filter(_ => _.panelThick.find(_ => _ == panel) )[0]
            // console.log(_da, 'profileType');
            var handleData = itemMaster.filter(i => (i.Code == _da?.handle?.Code))[0]
            var connectorData = itemMaster.filter(i => (i.Code == _da?.connector?.Code))[0]
            var boltData = itemMaster.filter(i => (i.Code == _da?.bolt?.Code))[0]
            var nutInsertData = itemMaster.filter(i => (i.Code == _da?.nutInsert?.Code))[0]
            var _handle = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: handleData?.Code,
                ItemName: handleData?.Name,
                Qty: (_da?.handle?.Qty) * doorQty * unitQty,
                Unit: handleData?.Unit,
                ItemType: constants.itemType,
                ItemGroup: handleData?.Item_Group,
            }
            var _connector = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: connectorData?.Code,
                ItemName: connectorData?.Name,
                Qty: (_da?.connector?.Qty) * doorQty * unitQty,
                Unit: connectorData?.Unit,
                ItemType: constants.itemType,
                ItemGroup: connectorData?.Item_Group,
            }
            var _bolt = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: boltData?.Code,
                ItemName: boltData?.Name,
                Qty: (_da?.bolt?.Qty) * doorQty * unitQty,
                Unit: boltData?.Unit,
                ItemType: constants.itemType,
                ItemGroup: boltData?.Item_Group,
            }
            var _nutInsert = dataType = {
                SrNo: constants.SrNo,
                BOMType: '',
                Plant: constants.Plant,
                Item_Code: '',
                Item_Name: '',
                BOMVariant: soNum,
                BaseQty: '',
                BaseUnit: '',
                ItemCode: nutInsertData?.Code,
                ItemName: nutInsertData?.Name,
                Qty: (_da?.nutInsert?.Qty) * doorQty * unitQty,
                Unit: nutInsertData?.Unit,
                ItemType: constants.itemType,
                ItemGroup: nutInsertData?.Item_Group,
            }
            doorData.push(_handle, _connector, _bolt,_nutInsert)
            if (isViewPort == true) {
                var viewPortData = itemMaster.filter(i => (i.Code == _da?.viewPort?.Code))[0]
                console.log(panel, '_da?.viewPort?.Qty');
                var _viewPort = dataType = {
                    SrNo: constants.SrNo,
                    BOMType: '',
                    Plant: constants.Plant,
                    Item_Code: '',
                    Item_Name: '',
                    BOMVariant: soNum,
                    BaseQty: '',
                    BaseUnit: '',
                    ItemCode: viewPortData?.Code,
                    ItemName: viewPortData?.Name,
                    Qty: (_da?.viewPort?.Qty).toFixed(2) * doorQty * unitQty,
                    Unit: viewPortData?.Unit,
                    ItemType: constants.itemType,
                    ItemGroup: viewPortData?.Item_Group,
                }
                doorData.push(_viewPort)
            }
            if (doorType == "hinge") {
                var drillingScrewData = itemMaster.filter(i => (i.Code == _da?.drillingScrew?.Code))[0]
                var _drillingScrew = dataType = {
                    SrNo: constants.SrNo,
                    BOMType: '',
                    Plant: constants.Plant,
                    Item_Code: '',
                    Item_Name: '',
                    BOMVariant: soNum,
                    BaseQty: '',
                    BaseUnit: '',
                    ItemCode: drillingScrewData?.Code,
                    ItemName: drillingScrewData?.Name,
                    Qty: (_da?.drillingScrew?.Qty) * doorQty * unitQty,
                    Unit: drillingScrewData?.Unit,
                    ItemType: constants.itemType,
                    ItemGroup: drillingScrewData?.Item_Group,
                }
doorData.push(_drillingScrew)
            }
        })
        console.log(doorArr);
        return doorData;
    }
}