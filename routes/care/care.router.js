const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validation");
const { setCustomerFeedback
} = require("./care.controller");

router.post("/customerFeedback", setCustomerFeedback);

module.exports = router;
