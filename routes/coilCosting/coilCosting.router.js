const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  getCoilPriceList,
  getDetails,
  setEnquiry,
  updateEnquiry
} = require("./coilCosting.controller");
router.get("/getCoilPriceList", getCoilPriceList);
router.get("/getDetails", getDetails);
router.post("/setEnquiry", setEnquiry);
router.post("/updateEnquiry", updateEnquiry);

module.exports = router;
