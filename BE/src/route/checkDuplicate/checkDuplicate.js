"use strict";
const express = require("express");
const router = express.Router();
const DataUserManager = require("../../module/data/userManager");

router.post("/", async (req, res) => {
  const user_id = req.body?.user_id;

  const checkdata = await DataUserManager.checkDuplicate(user_id);
  if (checkdata == false) {
    return res.json({
      code: 500,
      message: "UserId already exists!!",
    });
  }
  return res.json({
    code: 200,
    message: "You can use this id",
  });
});

module.exports = router;
