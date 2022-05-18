const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  getList,
  getDetails,
  set,
  getItemMaster,
  bomProcess,getItemMasterXLSX,
  downloadBOM
} = require("./bom.controller");
router.get("/getList", getList);

router.get("/getItemMaster", getItemMaster);
router.get("/getItemMasterXLSX", getItemMasterXLSX);
router.get("/getDetails", getDetails);
router.post("/bomProcess", bomProcess);
router.get("/download", downloadBOM);
router.post("/set", set);

module.exports = router;
