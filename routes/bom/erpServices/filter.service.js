var {constants} = require('../template/calculation.json')
module.exports = {
    filter: (data, filter, itemMaster, unitQty) =>{

    var filterBodyData = data.filterForm.filters
    let filterData = []

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
            ItemType: '',
            ItemGroup: ''
        }
        for (let i = 0; i < filterBodyData.length; i++) {
            let totalFilterQty = filterBodyData[i].sizes.reduce((a,{qty}) => (a+qty),0);
            console.log(totalFilterQty, 'totalFilterQty');
        for (let j = 0; j < filterBodyData[i].sizes.length; j++) {
           
            var filterSize = dataType = {
               SrNo: constants.SrNo,
               BOMType: '',
               Plant: constants.Plant,
               Item_Code: '',
               Item_Name: '',
               BOMVariant: soNum,
               BaseQty: '',
               BaseUnit: '',
               ItemCode: filterBodyData[i]?.sizes[j]?.size?.Code,
               ItemName: filterBodyData[i]?.sizes[j]?.size?.Name,
               Qty : (filterBodyData[i]?.sizes[j]?.qty)*unitQty,
               Unit: filterBodyData[i]?.sizes[j]?.size?.Unit,
               ItemType: constants?.itemType,
               ItemGroup: filterBodyData[i]?.sizes[j]?.size?.Item_Group,
            }


            filterData.push(filterSize)

        }
         console.log(filterBodyData[i].construction,'gg')
         const hardware = itemMaster.filter(j => j.Description == 'Filter Hardware')
         if (filterBodyData[i].construction == 'Flange'){
             var hardware1 = dataType = {
                 SrNo: constants.SrNo,
                 BOMType: '',
                 Plant: constants.Plant,
                 Item_Code: '',
                 Item_Name: '',
                 BOMVariant: soNum,
                 BaseQty: '',
                 BaseUnit: '',
                 ItemCode: hardware[0]?.Code,
                 ItemName: hardware[0]?.Name,
                 Qty: 4 * totalFilterQty * unitQty,
                 Unit: hardware[0]?.Unit,
                 ItemType: constants?.itemType,
                 ItemGroup: hardware[0]?.Item_Group,
             }
             var hardware2 = dataType = {
                 SrNo: constants.SrNo,
                 BOMType: '',
                 Plant: constants.Plant,
                 Item_Code: '',
                 Item_Name: '',
                 BOMVariant: soNum,
                 BaseQty: '',
                 BaseUnit: '',
                 ItemCode: hardware[1]?.Code,
                 ItemName: hardware[1]?.Name,
                 Qty: 4 * totalFilterQty * unitQty,
                 Unit: hardware[1]?.Unit,
                 ItemType: constants?.itemType,
                 ItemGroup: hardware[1]?.Item_Group,
             }
             filterData.push(hardware1, hardware2)
         } else {
             var hardware1 = dataType = {
                 SrNo: constants.SrNo,
                 BOMType: '',
                 Plant: constants.Plant,
                 Item_Code: '',
                 Item_Name: '',
                 BOMVariant: soNum,
                 BaseQty: '',
                 BaseUnit: '',
                 ItemCode: hardware[0]?.Code,
                 ItemName: hardware[0]?.Name,
                 Qty: 3 * unitQty,
                 Unit: hardware[0]?.Unit,
                 ItemType: constants?.itemType,
                 ItemGroup: hardware[0]?.Item_Group,
             }
             var hardware2 = dataType = {
                 SrNo: constants.SrNo,
                 BOMType: '',
                 Plant: constants.Plant,
                 Item_Code: '',
                 Item_Name: '',
                 BOMVariant: soNum,
                 BaseQty: '',
                 BaseUnit: '',
                 ItemCode: hardware[1]?.Code,
                 ItemName: hardware[1]?.Name,
                 Qty: 3 * unitQty,
                 Unit: hardware[1]?.Unit,
                 ItemType: constants?.itemType,
                 ItemGroup: hardware[1]?.Item_Group,
             }
             filterData.push(hardware1, hardware2)

         }

        }

        return filterData
    }
}