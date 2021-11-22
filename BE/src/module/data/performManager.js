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
            console.log(id);
            const userInfo = await this.findPreferInUser(id);
            console.log(userInfo);
            console.log(`userInfo: ${JSON.stringify(userInfo)}`);
            if (userInfo == false || userInfo == null) {
                console.log(`There is no user with typed user id!`);
                return false;
            }
            let preferList = new Array();
            console.log(userInfo.prefer);
            preferList.push(userInfo.prefer.split(","));
            //preferList = [공포, 스릴러, 액션]
            console.log(preferList[0][0]);

            const performName = "연극";
            let query = `SELECT * from Details WHERE genreNm='${performName}'`;

            /*
            //1번 start
            var connection = mysql.createConnection({  
                host     : '220.88.210.225',  
                user     : 'dbmaster',  
                password : 'tlaqudrb12!',  
                database : 'Performance'  
              });

            connection.connect(function(err){  
                if(!err) {  
                    console.log("Database is connected ... \n\n");    
                } else {  
                   console.log("Error connecting database ... \n\n");
                   console.log(err);    
                }  
            });
            connection.query(query, function(err, rows, fields) {  
                connection.end();  
                  if (!err){  
                        console.log("=================================");
                    console.log(rows);
                      console.log("정상적으로 db에서 공연 데이터 추출");
                      console.log("=================================");
                  }
            })
            */
            //1번 end 

            //2번 start
            
            return await models.sequelize
                .query(
                    query,
                    {
                        type: models.Sequelize.QueryTypes.SELECT,
                    }
                    );
                
            //2번 end
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
    static async findOnePerform(id){
        try{
            //1번 start
            let query = `SELECT * from Details WHERE mt20id='${id}'`;

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
}

module.exports = DataPerformManager;