const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      prefer: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
    },
  );

  users.associate = function (models) {
    users.hasMany(models.comment, {
      foreignKey: "creator_id",
      sourceKey: "id",
    });
  };
  return users;
};
