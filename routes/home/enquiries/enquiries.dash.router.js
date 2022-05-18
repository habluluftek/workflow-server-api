const router = require("express").Router();
const {
    getEnquiries, chartData
    
} = require("./enquiries.dash.controller");

router.get('/enquiryData', getEnquiries);
router.get('/chartData', chartData);

module.exports = router;


