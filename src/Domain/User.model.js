const jwt = require("jsonwebtoken");
const config = require("../Infrastructure/Config/index");

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
      //Reset token
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordExpire: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  // Token üretme (JWT)
  // User.createAuthToken = function (user) {
  //   return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, config.jwt.secret, {
  //     expiresIn: config.jwt.expiresIn,
  //   });
  // };

  return User;
};
