const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  getList,
  getDetails
} = require("./users.controller");
router.get("/getList", getList);
router.get("/getDetails", getDetails);

module.exports = router;
