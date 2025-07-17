const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Token = sequelize.define(
    "Token",
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // kullanıcı tablosu adı
          key: "id",
        },
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "tokens",
      timestamps: true,
    }
  );

  return Token;
};
