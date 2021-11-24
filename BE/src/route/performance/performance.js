const express = require("express");
const DataPerformManager = require("../../module/data/performManager");
const router = express.Router();
var path = require("path");

router.post("/", async (req, res) => {
    const userId = req.body.user_id;

    const result = await DataPerformManager.findPerformInDetail(userId);
    console.log("result: ");
    console.log(result);

    if(result == false){
        return res.json({ code: 500 });
    };
    return res.json({ 
        code: 200, 
        message: "successfully got performances.",
        performInfo: result,
    });
});

router.get("/", async (req, res) => {
    const result = await DataPerformManager.findAllPerform();
    console.log(result);
    if(result == undefined){
        return res.json({ code: 500 });
    };
    return res.json({ 
        code: 200, 
        message: "successfully got performances.",
        performInfo: result,
    });
});
router.post("/detail", async (req, res) => {
    const performId = req.body?.perform_id;

    const result = await DataPerformManager.findOnePerform(performId);
    console.log(result);
    if(result == false){
        return res.json({ 
            code: 500,
            message: "No performances.",
        });
    };
    return res.json({ 
        code: 200, 
        message: "Successfully got performance detail.",
        performInfo: result,
    });
});
module.exports = router;