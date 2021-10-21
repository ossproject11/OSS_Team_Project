const express = require("express");
const auth = require("./auth");
const register = require("./register");
const checkDuplicate = require("./checkDuplicate");

const router = express.Router();

router.use("/auth", auth);
router.use("/register", register);
router.use("/checkDuplicate", checkDuplicate);

module.exports = router;
