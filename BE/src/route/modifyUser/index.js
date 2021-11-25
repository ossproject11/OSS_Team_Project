const express = require("express");
const modifyUser = require("./modifyUser");

const router = express.Router();

router.use("/", modifyUser);

module.exports = router;