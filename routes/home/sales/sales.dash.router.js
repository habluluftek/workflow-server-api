const router = require("express").Router();
const {
    getOrders, chartData, totalBooking
    
} = require("./sales.dash.controller");

router.get('/orderData', getOrders);
router.get('/chartData', chartData);
router.get('/totalBooking', totalBooking);

module.exports = router;


