const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  getList,
  getDetails,
  set,getCustomerFeedback
} = require("./customers.controller");
router.get("/getList", getList);
router.get("/getDetails", getDetails);

router.get("/getCustomerFeedback", getCustomerFeedback);
router.post("/set", set);

module.exports = router;
