// models/User.model.js
const jwt = require("jsonwebtoken");
const config = require("../Config/index"); // config dosyanızın doğru yolunu kontrol edin

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fullName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  // Statik metotlar
  User.createAuthToken = function (user) {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  };

  return User;
};
