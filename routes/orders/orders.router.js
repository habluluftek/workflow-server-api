const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  getList,
  getDetails,
  setOrder, getFiles, setFile, fileUpload, setEstimatedCost, setActualCost, 
  setListPrice,setInstallationCost,
  search, testEmail, setPPCApproved, sendForPPC, updateOrder, searchBilling,
  downloadFile, uploadFile, setDispatch,
  updateEnquiry, query, setOrderItem, sendProductionPlan, sendEstimatedCost, setOrderItemUpload
} = require("./orders.controller");



router.get("/getList", getList);
// router.get("/getDetails", getDetails);
router.get("/getDetails", getDetails);
router.post("/setOrder", setOrder);
router.post("/updateOrder", updateOrder);
router.post("/setOrderItem", setOrderItem);
router.post("/updateEnquiry", updateEnquiry);
router.get("/", query);
router.get("/getFiles", getFiles);
router.post("/setFile", setFile);
router.post("/downloadFile", downloadFile);
router.post("/uploadFile", uploadFile);
router.post("/fileUpload", fileUpload);
router.post("/setEstimatedCost", setEstimatedCost);
router.post("/setActualCost", setActualCost);
router.post("/setListPrice", setListPrice);
router.post("/setInstallationCost", setInstallationCost);
router.post("/sendProductionPlan", sendProductionPlan);
router.post("/sendEstimatedCost", sendEstimatedCost);
router.post("/setOrderItemUpload", setOrderItemUpload);
router.post("/setDispatch", setDispatch);
router.get("/setPPCApproved", setPPCApproved);
router.get("/sendForPPC", sendForPPC);
router.post("/search", search);
router.post("/searchBilling", searchBilling);
router.get("/emailTest", testEmail);

module.exports = router;
