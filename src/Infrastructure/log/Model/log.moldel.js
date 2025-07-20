const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db/connection");

exports.Log = sequelize.define(
  "Log",
  {
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "logs",
    timestamps: true,
  }
);
