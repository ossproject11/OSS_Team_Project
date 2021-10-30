const express = require("express");
const getUserInfo = require("./getUserInfo");

const router = express.Router();

router.use("/", getUserInfo);

module.exports = router;