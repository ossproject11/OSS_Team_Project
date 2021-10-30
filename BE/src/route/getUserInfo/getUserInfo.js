const express = require("express");
const DataUserManager = require("../../module/data/userManager");
const router = express.Router();
var path = require("path");

router.post("/", async (req, res) => {
    const user_id = req.body.user_id;

    const result = await DataUserManager.getUserInfo(user_id);
    if(result == undefined){
        return res.json({ code: 500 });
    };
    return res.json({ 
        code: 200, 
        message: "successfully found user.",
        userInfo: result,
    });
});

module.exports = router;