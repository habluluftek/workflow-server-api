var status = require('../../../data/options/status.json');
var {
    getOrders,
    chartData, totalBooking
} = require('./sales.dash.service');
var {
    userLoggedIn
} = require('../../auth/services/loginService')

// var Rx = require("rxjs");

// const getOrdersRX$ = Rx.Observable(getOrdersRX)

module.exports = {
    getOrders: async (req, res) => {
        try {
            const results = await getOrders();
            const _orderItems = results[0][0];
            const _orderItems_WO_LP = results[1][0];
            const _orderItems_WO_AP = results[5][0];
            const _recentOrders = results[2][0];
            const _currentMonthOrders = results[3][0];
            const _previousMonthOrders = results[4][0];
            // const listPriceCount = {
            //     items_WO_LP: _orderItems_WO_LP.reduce((a, {qty}) => a + qty, 0),
            //     totalItems: _orderItems.reduce((a, {qty}) => a + qty, 0), 
            //     items_W_LP: _orderItems.reduce((a, {qty}) => a + qty, 0) - _orderItems_WO_LP.reduce((a, { qty}) => a + qty, 0)
            // }

            // const actualPriceCount = {
            //      items_WO_AP: _orderItems_WO_AP.reduce((a, {qty}) => a + qty, 0),
            //      totalItems: _orderItems.reduce((a, {qty}) => a + qty, 0),
            //      items_W_AP: _orderItems.reduce((a, {qty}) => a + qty, 0) - _orderItems_WO_AP.reduce((a, {qty}) => a + qty, 0)
            // }

            const listPriceCount = {
                items_WO_LP: _orderItems_WO_LP?.length,
                totalItems: _orderItems?.length,
                items_W_LP: _orderItems?.length - _orderItems_WO_LP?.length
            }

            const actualPriceCount = {
                items_WO_AP: _orderItems_WO_AP?.length,
                totalItems: _orderItems?.length,
                items_W_AP: _orderItems?.length - _orderItems_WO_AP?.length
            }

            const recentOrders = _recentOrders.map(({
                soNum,
                jobRef,
                poDate,
                projectName,
                customerId,
                customerName,
                salesEr,
                salesErName,
            }) => ({
                soNum,
                jobRef,
                poDate,
                projectName,
                customerId,
                customerName,
                salesEr,
                salesErName,
                qty: _orderItems?.filter(i => i.soNum == soNum)?.reduce((a, {
                    qty
                }) => a + qty, 0),
                poPrice: _orderItems?.filter(i => i.soNum == soNum)?.reduce((a, {
                    rate,
                    qty
                }) => a + rate * qty, 0)
            }))

            const currentMonthOrders = _currentMonthOrders.map(({
                soNum,
                poDate,
                projectName,
                customerId,
                salesEr
            }) => ({
                soNum,
                poDate,
                projectName,
                customerId,
                salesEr,
                qty: _orderItems?.filter(i => i.soNum == soNum)?.reduce((a, {
                    qty
                }) => a + qty, 0),
                poPrice: _orderItems?.filter(i => i.soNum == soNum)?.reduce((a, {
                    rate,
                    qty
                }) => a + rate * qty, 0)
            }))
            const previousMonthOrders = _previousMonthOrders.map(({
                soNum,
                poDate,
                projectName,
                customerId,
                salesEr
            }) => ({
                soNum,
                poDate,
                projectName,
                customerId,
                salesEr,
                qty: _orderItems?.filter(i => i.soNum == soNum)?.reduce((a, {
                    qty
                }) => a + qty, 0),
                poPrice: _orderItems?.filter(i => i.soNum == soNum)?.reduce((a, {
                    rate,
                    qty
                }) => a + rate * qty, 0)
            }))

            const data = {
                listPriceCount,
                actualPriceCount,
                recentOrders,
                currentMonthOrders,
                previousMonthOrders
            }

            return res.status(200).json({
                success: 1,
                message: 'Successfully Data Fetched',
                data: data
            });
        } catch (error) {
            return res.json({
                success: 0,
                message: 'No Data Fetched' + ' ' + error.message,
                data: []
            });
        }
    },

    chartData: async (req, res) => {
        try {
            const results = await chartData();
            const saleOrders = results[3][0];
            const saleOrdersData = results[0][0];
            const dispatches = results[1][0];
            const saleOrderItems = results[2][0];
            const _dispatchData = dispatches?.map(({
                itemIds,
                qty,
                actualDispatchDate,
                freightCharge,
                soNum
            }) => ({
                soNum,
                itemIds: itemIds.split(',').map(x => +x),
                qty: qty.split(',').map(x => +x),
                dispatchDate: actualDispatchDate,
                freightCharge
            }));
            const dispatchesGroup = {}
            let dispatch = []
            let _dispatch = []
            for(const obj of _dispatchData){
                obj.itemIds.forEach((items, i) => {
                    _dispatch.push(
                        {
                            soNum: obj.soNum,
                            itemId : items,
                            qty: obj.qty[i],
                            dispatchDate: obj.dispatchDate,
                            actualfreightCharge: obj.qty[i] == 0 ? 0 : parseFloat((obj.freightCharge / obj.qty[i]).toFixed(2))
                        }
                    )
                })
            }
            const billedOrdersData = _dispatch.map(({
                soNum,
                itemId,
                qty,
                dispatchDate,
                actualfreightCharge
            }) => ({
                itemId,
                soNum,
                rate: saleOrderItems.filter(i => i.id == itemId)[0].rate,
                qty,
                billingValue: saleOrderItems.filter(i => i.id == itemId)[0].rate * qty,
                dispatchDate,
                actualfreightCharge,
                salesEr: saleOrders.filter(i => i.soNum === soNum)[0].salesEr
            })).filter(i => i.qty !== 0)

            for (const o of _dispatchData) {
                o.itemIds.forEach((item, i) => {

                    if (dispatchesGroup[item]) {
                        dispatchesGroup[item].pastQty += +o.qty[i]
                        dispatch.push(dispatchesGroup[item].pastQty)
                    } else
                        dispatchesGroup[item] = {
                            item,
                            pastQty: +o.qty[i]
                        }
                        dispatch.push(dispatchesGroup[item])
                })
            }
            const data = {
                saleOrdersData,
                 billedOrdersData
            }
            return res.status(200).json({
                success: 1,
                message: 'Successfully Data Fetched',
                data: data
            });
        } catch (error) {
            return res.json({
                success: 0,
                message: 'No Data Fetched' + ' ' + error.message,
                data: []
            });
        }
    },

    totalBooking: async (req, res) => {
        try {
            var loggedInUser = userLoggedIn(req);
            var results = await totalBooking(loggedInUser?.userData);
            var totalBookingResult = results[0][0];
            var currentDate = new Date();
            var currentMonth = currentDate.getMonth();
            console.log(currentMonth);
            var currentMonthBookingResult = totalBookingResult.filter(i => (i.poDate).getMonth() == currentMonth);
            var totalBookingValue = totalBookingResult.reduce((a, {
                amount
            }) => a + amount, 0);
            var currentMonthBookingValue = currentMonthBookingResult.reduce((a, {
                amount
            }) => a + amount, 0);
            var data = {
                totalBookingValue,
                currentMonthBookingValue
            }
            return res.status(200).json({
                success: 1,
                message: 'Successfully Data Fetched',
                data: data
            });
        } catch (error) {
            return res.json({
                success: 0,
                message: 'No Data Fetched' + ' ' + error.message,
                data: []
            });
        }
    }



}