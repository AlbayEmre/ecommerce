const Joi = require("joi");
exports.validateCategory = function (category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    products: Joi.array().optional(), // Product id dizisi opsiyonel
    description: Joi.string().min(10).max(300).optional(),
  });

  return schema.validate(category);
};
