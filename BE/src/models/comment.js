const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const comment = sequelize.define(
    "comment",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      perform_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      create_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      creator_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      sequelize,
      charset: "utf-8",
      collate: "utf8_general_ci",
      tableName: "comment",
      timestamps: true,
    }
  );

  comment.associate = function (models) {
    comment.belongsTo(models.users, {
      sourceKey: "id",
      foreignKey: "creator_id",
    });
  };

  return comment;
};
