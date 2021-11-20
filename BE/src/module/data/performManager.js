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
            log.error(err);
            return undefined;
        }
    }

    static async findPerformInDetail(id){
        try{
            //회원의 장르 추출
            const userInfo = await this.findPreferInUser(id);
            console.log(`userInfo: ${JSON.stringify(userInfo)}`);
            if (userInfo == null) {
                console.log(`There is no user with typed user id!`);
                return false;
            }
            let preferList = new Array();
            preferList.push(userInfo.prefer.split(","));
            //preferList = [공포, 스릴러, 액션]

            //1번 start
            let query = `SELECT * from Details WHERE genreNm='${preferList[0]}'`;
            var connection = mysql.createConnection({  
                host     : '220.88.210.225',  
                user     : 'dbmaster',  
                password : 'tlaqudrb121',  
                database : 'Performance'  
              });

            connection.connect(function(err){  
                if(!err) {  
                    console.log("Database is connected ... \n\n");    
                } else {  
                   console.log("Error connecting database ... \n\n");    
                }  
            });
            connection.query(query, function(err, rows, fields) {  
                connection.end();  
                  if (!err){  
                      console.log("정상적으로 db에서 공연 데이터 추출");
                      console.log(fields);
                  }
            })
            
            //1번 end 

            //2번 start
            /*
            models.sequelize
                .query(
                    query,
                    {
                        type: models.Sequelize.QueryTypes.SELECT,
                    }
                    )
                    .then((result) => {
                    res.send(result);
                });
                */
            //2번 end
        }catch(err){
            log.err(err);
            return undefined;
        }
    }

}

module.exports = DataPerformManager;