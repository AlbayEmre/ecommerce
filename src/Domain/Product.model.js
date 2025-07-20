const { DataTypes } = require("sequelize");
const coments = require(".");
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories", // tablonun adı (model adı değil!)
          key: "id",
        },
      },
      //coments --> Has many
    },

    {
      tableName: "products", //oluşan tablonun adı
      timestamps: true,
    }
  );
  return Product;
};
