const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  getList,
  getDetails, options, getMarginFactor
} = require("./options.controller");
router.get("/getList", getList);
router.get("/getDetails", getDetails);
router.get("/getMarginFactor", getMarginFactor);
router.get("/", options);

module.exports = router;
