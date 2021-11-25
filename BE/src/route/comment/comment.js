const express = require("express");
const DataPerformManager = require("../../module/data/performManager");
const router = express.Router();
var path = require("path");

router.get("/", async function (req, res) {
    const resultCode = await DataPerformManager.getAllComments();
    return res.json({ code: 200, result: JSON.stringify(resultCode) });
});

router.post("/", async (req, res) => {
    const perform_id = req.body.perform_id;
    const user_name = req.body.user_name;
    const comment = req.body.comment;
    
    const resultCode = await DataPerformManager.commentOnPerform(perform_id, user_name, comment);
    if(resultCode == false){
        return res.json({ 
            code: 500,
            message: "failed to submit comment."
         });
    };
    return res.json({ code: 200, message: "successfully submitted comment." });
});

module.exports = router;