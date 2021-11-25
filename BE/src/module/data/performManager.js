"use strict";
const models = require("../../models");
const encrypt = require("../../config/password.config");
const moment = require("../../config/moment.config");
const jwt = require("jsonwebtoken");
var mysql = require('mysql');  

class DataPerformManager{
    static async findPreferInUser(id) {        
        try {
            return await models.users.findOne({
                where: {
                    id: id,
                },
            });
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    static async findPerformInDetail(id){
        try{
            //회원의 장르 추출
            const userInfo = await this.findPreferInUser(id);
            if (userInfo == false || userInfo == null) {
                console.log(`There is no user with typed user id!`);
                return false;
            }

            let preferList = new Array();
            for(var i = 0; i < userInfo.prefer.split(", ").length; i++){
                preferList.push(userInfo.prefer.split(", ")[i]);

            }
            
            let form = [];
            for(var i = 0; i < preferList.length; i++){
                var query = `SELECT * from Details WHERE user_want='${preferList[i]}'`;
                form.push(
                    await models.sequelize
                    .query(
                        query,
                        {
                            type: models.Sequelize.QueryTypes.SELECT,
                        }
                        ));
            }
            return form;

        }catch(err){
            console.log(err);
            return false;
        }
    }

    static async findAllPerform(){
        try{
            //1번 start
            let query = `SELECT * from Details`;

            //1번 end 
            return await models.sequelize
                .query(
                    query,
                    {
                        type: models.Sequelize.QueryTypes.SELECT,
                    }
                    )
        }catch(err){
            console.log(err);
            return false;
        }
    }
    static async findOnePerform(performId){
        try{
            //1번 start
            let query = `SELECT * from Details WHERE mt20id='${performId}'`;

            //1번 end 
            //let queryResult = [];
            let performInfo = await models.sequelize
                .query(
                    query,
                    {
                        type: models.Sequelize.QueryTypes.SELECT,
                    }
                    );
            //queryResult.push(performInfo);
            let commentInfo = await models.comment
            .findAll({ 
                where:{
                    perform_id: performId,
                } 
            })
            ;
            return {performInfo , commentInfo};
        }catch(err){
            console.log(err);
            return false;
        }
    }
    static async commentOnPerform(performId, userName, comment){
        try{
            models.comment
            .create({ 
                perform_id: performId, 
                creator_name: userName,
                comment: comment, 
                create_time: moment().format("YYYY-MM-DD HH:mm:ss")
            })
            .then((result) => {
                console.log(`댓글 작성 성공: ${JSON.stringify(result)}`);
                return result;
            })
            .catch((err) => {
                console.log(`댓글 작성 실패: ${err}`);
                return false;
            });
        }catch(err){
            console.log(err);
            return false;
        }
    }
    static async getAllComments(){
        try{
            models.comment
            .findAll()
            .then((result) => {
                console.log(`댓글 조회 성공: ${JSON.stringify(result)}`);
                return JSON.stringify(result);
            })
            .catch((err) => {
                console.log(`댓글 조회 실패: ${err}`);
                return false;
            });
        }catch(err){
            console.log(err);
            return false;
        }
    }
}

module.exports = DataPerformManager;