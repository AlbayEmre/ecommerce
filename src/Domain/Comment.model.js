const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products", // tablo adı!
          key: "id",
        },
      },
    },
    {
      tableName: "comments", //oluşan tablonun adı
      timestamps: true,
    }
  );
  return Comment;
};
