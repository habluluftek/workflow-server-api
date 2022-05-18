const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const {
  getList,
  getDetails,
  getTroubles,
  getLogs,
  setCall,
  setComplaint,
  setLog,
  setRespond,
  setComplete,
  dailyReport,
  threeDaysReport,
  report,
  reportDownload
} = require("./serviceCall.controller");
router.get("/getList", getList);
router.get("/getDetails", getDetails);
router.get("/getTroubles", getTroubles);
router.get("/getLogs", getLogs);
router.post("/setCall", setCall);
router.post("/setComplaint", setComplaint);
router.post("/setLog", setLog);
router.post("/setRespond", setRespond);
router.post("/setComplete", setComplete);
router.get("/dailyReport", dailyReport);
router.get("/report", report);
router.get("/reportDownload", reportDownload);
router.get("/three",threeDaysReport);

module.exports = router;
