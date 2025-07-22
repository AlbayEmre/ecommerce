const { sequelize } = require("../Infrastructure/db/connection");
const { DataTypes } = require("sequelize");
const User = require("./User.model")(sequelize, DataTypes);
const Product = require("./Product.model")(sequelize, DataTypes);
const Category = require("./Category.model")(sequelize, DataTypes);
const Comment = require("./Comment.model")(sequelize, DataTypes);
const Token = require("./token.model")(sequelize, DataTypes);

const db = {
  User,
  Product,
  Category,
  Comment,
  Token,
  sequelize,
};

module.exports = db;
