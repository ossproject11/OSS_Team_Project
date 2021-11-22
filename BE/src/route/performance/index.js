const express = require("express");
const performance = require("./performance");

const router = express.Router();

router.use("/", performance);
router.use("/", performance);

module.exports = router;