const express = require("express");
const auth = require("./auth");
const register = require("./register");
const checkDuplicate = require("./checkDuplicate");
const getUserInfo = require("./getUserInfo");
const performance = require("./performance");
const modifyUser = require("./modifyUser");
const comment = require("./comment");
const router = express.Router();

router.use("/auth", auth);
router.use("/register", register);
router.use("/checkDuplicate", checkDuplicate);
router.use("/getUserInfo", getUserInfo);
router.use("/perform", performance);
router.use("/modifyUser", modifyUser);
router.use("/comment", comment);

module.exports = router;
