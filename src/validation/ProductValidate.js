const Joi = require("joi");
exports.validateProduct = function (product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().required(),
    description: Joi.string().allow(""), //boş tırnaga izin ver
    imageUrl: Joi.string()
      .pattern(/^\/uploads\/[a-zA-Z0-9_.-]+$/)
      .allow(""),
    isActive: Joi.boolean(),
    categoryId: Joi.number().integer().required(), // foreignKey zorunlu
    comments: Joi.array().optional(), // yorumlar manuel gönderilmez genelde
  });

  return schema.validate(product);
};
