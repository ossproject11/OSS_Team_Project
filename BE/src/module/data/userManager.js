"use strict";
const models = require("../../models");
const encrypt = require("../../config/password.config");
const moment = require("../../config/moment.config");
const jwt = require("jsonwebtoken");

class DataUserManager {
    static async findUserInDB(user_id) {
        try {
            return await models.users.findOne({
                where: {
                    id: user_id,
                },
            });
        } catch (err) {
            log.error(err);
            return false;
        }
    }
    static async getUserInfo(user_id) {
        const userInfo = await this.findUserInDB(user_id);
        console.log(`userInfo: ${JSON.stringify(userInfo)}`);
        if (userInfo == null || userInfo == false) {
            console.log(`There is no user with typed user id!`);
            return false;
        }
        return userInfo;
    }
    static async register(user_id, user_pwd, user_name, user_prefer) {
        //const userInfo = await this.findUserInDB(user_id);
        //console.log(`userInfo: ${JSON.stringify(userInfo)}`);
        //if (userInfo !== null) {
        //    console.log(`userId is already existed! ${userInfo.id}`);
        //    return false;
        //}
        console.log(`create new data: ${user_id}, ${user_pwd}, ${user_name}`);
        models.users
            .create({ id: user_id, password: encrypt.encrypt(user_pwd), name: user_name, prefer: user_prefer, createdAt: moment().format("YYYY-MM-DD HH:mm:ss"), USER_POSITION: 1 })
            .then((result) => {
                console.log(`새 유저 생성 성공 : ${result.id}`);
                return true;
            })
            .catch((err) => {
                console.log(`유저 생성 실패: ${err}`);
                return false;
            });
        return true;
    }

    static async checkDuplicate(user_id) {
        const userInfo = await this.findUserInDB(user_id);
        if (userInfo !== null || userInfo !== false) {
            console.log(`userId is already exists! ${userInfo.USER_ID}`);
            return false;
        }
        return true;
    }

    static async login(user_id, user_pwd) {
        const userInfo = await this.findUserInDB(user_id);
        console.log(JSON.stringify(userInfo));
        if (encrypt.isPasswordSame(user_pwd, userInfo.password)) {
            const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
            models.users.update(
                {
                    location: nowDate,
                },
                {
                    where: {
                        id: user_id,
                    },
                }
            );

            const token = jwt.sign(
                {
                    id: user_id,
                    name: userInfo.USER_NAME,
                    location: nowDate,
                    position: userInfo.USER_POSITION,
                },
                process.env.SECRET,
                {
                    expiresIn: "9h",
                }
            );
            console.log("token:");
            console.log(token);
            return token;
        } else {
            return false;
        }
    }
}

module.exports = DataUserManager;
