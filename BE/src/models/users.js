const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define(
    "users",
    {
      USER_ID: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      USER_PWD: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      USER_NAME: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      USER_PREFER: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      USER_LASTLOGIN: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      USER_POSITION: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
    },
  );

  return users;
};
