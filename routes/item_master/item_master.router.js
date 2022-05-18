const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  getList,
  getDetails,
  set
} = require("./item_master.controller");
router.get("/getList", getList);
router.get("/getDetails", getDetails);
router.post("/set", set);

module.exports = router;
