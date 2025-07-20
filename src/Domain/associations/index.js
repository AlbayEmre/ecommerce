module.exports = (db) => {
  db.Category.hasMany(db.Product, {
    foreignKey: "categoryId",
    as: "products",
  });

  db.Product.belongsTo(db.Category, {
    foreignKey: "categoryId",
    as: "category",
  });

  db.Product.hasMany(db.Comment, {
    foreignKey: "productId",
    as: "comments",
  });

  db.Comment.belongsTo(db.Product, {
    foreignKey: "productId",
    as: "product",
  });

  db.Token.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user",
  });

  //Token
  // db.User.hasMany(db.Token, {
  //   foreignKey: "userId",
  //   as: "tokens",
  // });
};
