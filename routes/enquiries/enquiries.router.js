const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  getList,
  getDetails,
  setEnquiry,
  updateEnquiry, getListMongo, setEnquiryMongo, search
} = require("./enquiries.controller");
router.get("/getList", getList);
router.get("/getDetails", getDetails);
router.post("/setEnquiry", setEnquiry);
router.put("/updateEnquiry", updateEnquiry);
router.post("/search", search);

module.exports = router;
