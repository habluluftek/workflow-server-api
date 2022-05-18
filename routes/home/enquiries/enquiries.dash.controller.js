var status = require('../../../data/options/status.json');
var {
    getEnquiries,
    chartData
} = require('./enquiries.dash.service');
// var moment = require('moment');
const moment = require('moment-timezone');

// var Rx = require("rxjs");

// const getOrdersRX$ = Rx.Observable(getOrdersRX)

module.exports = {
    getEnquiries: async (req, res) => {
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
            const enquiryData = results[0][0];
            let yearsArr = []
            enquiryData.forEach(i => {
                yearsArr.push(parseInt(moment(i.quoteDate).format('YYYY')));
            })
            const years = [...new Set(yearsArr.filter(x => x !== undefined).filter(i => i))]
            const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
            let data = []
            years.forEach(year => {
                let currentYear = parseInt(year);
                let nextYear = currentYear + 1;
                const startDate = new Date(`${currentYear}-04-01`);
                const endDate = new Date(`${nextYear}-03-31`);
                const startDateData = enquiryData.filter(i => moment(i.quoteDate).tz("Asia/Kolkata").format('YYYY-MM-DD  HH:mm:ss') >= moment(startDate).tz("Asia/Kolkata").format('YYYY-MM-DD  HH:mm:ss'))
                    .sort((a, b) => new Date(a.quoteDate) - new Date(b.quoteDate))
                const finalData = startDateData.filter(i => moment(i.quoteDate).tz("Asia/Kolkata").format('YYYY-MM-DD  HH:mm:ss') <= moment(endDate).tz("Asia/Kolkata").format('YYYY-MM-DD  HH:mm:ss'))
                    .sort((a, b) => new Date(a.quoteDate) - new Date(b.quoteDate))
                    .map(j => ({
                        id: j.id,
                        qty: j.qty,
                        quoteDate: moment(j.quoteDate).tz("Asia/Kolkata").format('YYYY-MM-DD'),
                        value: j.value,
                        customerId: j.customerId,
                        customerName: j.customerName,
                        salesEr: j.salesEr,
                        salesErName: j.salesErName

                    }))
                let consData = []
                months.forEach(month => {
                    const nos = finalData
                        .filter(i => moment(i.quoteDate).format('MMM') == month).length;
                    // const qty = finalData
                    //     .filter(i => moment(i.quoteDate).format('MMM') == month)
                    //     .reduce((a, {
                    //         qty
                    //     }) => a + parseInt(qty), 0);
                    // const value = finalData.filter(i => moment(i.quoteDate).format('MMM') == month).reduce((a, {
                    //     value
                    // }) => (a + parseInt(value)) / 100000, 0);
                    consData.push({
                        month: month,
                        noOfEnquiries: nos,
                        // qty,
                        // value
                        // value
                    })
                })
                const result = {
                    currentYear,
                    nextYear,
                    label: currentYear + ' to ' + nextYear,
                    startDate,
                    endDate,
                    // data: finalData,
                    consData
                }
                data.push(result)
            })
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