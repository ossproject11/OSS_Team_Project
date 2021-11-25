const express = require("express");
const comment = require("./comment");

const router = express.Router();

router.use("/", comment);

module.exports = router;