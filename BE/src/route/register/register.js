const express = require("express");
const DataUserManager = require("../../module/data/userManager");
const router = express.Router();
var path = require("path");

router.get("/", function (req, res) {
    res.render('register');
});

router.post("/", async (req, res) => {
    const user_id = req.body.user_id;
    const user_pwd = req.body.user_pwd;
    const user_name = req.body.user_name;

    let user_prefer = "";
    for(var i = 0; i < req.body.user_prefer.length; i++){
        if(i == req.body.user_prefer.length-1){
            user_prefer += req.body.user_prefer[i];
        }else{
            user_prefer += req.body.user_prefer[i] + ", ";
        }
    }
    //const user_prefer = req.body.user_prefer;
    
    const resultCode = await DataUserManager.register(user_id, user_pwd, user_name,user_prefer);
    if(resultCode == false){
        return res.json({ 
            code: 500,
            message: "failed to register."
         });
    };
    return res.json({ code: 200, message: "successfully registered." });
});

module.exports = router;