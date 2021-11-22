const express = require("express");
const DataPerformManager = require("../../module/data/performManager");
const router = express.Router();
var path = require("path");

router.post("/", async (req, res) => {
    const userId = req.body.user_id;

    const result = await DataPerformManager.findPerformInDetail(userId);
    if(result == undefined){
        return res.json({ code: 500 });
    };
    return res.json({ 
        code: 200, 
        message: "successfully got performances.",
        userInfo: result,
    });
});

router.get("/all", async (req, res) => {
    const result = await DataPerformManager.findAllPerform();
    console.log(result);
    if(result == undefined){
        return res.json({ code: 500 });
    };
    return res.json({ 
        code: 200, 
        message: "successfully got performances.",
        userInfo: result,
    });
});

module.exports = router;