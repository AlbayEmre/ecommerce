const Joi = require("joi");

exports.validateComment = function (comment) {
  const schema = Joi.object({
    text: Joi.string().min(5).max(200).required(),
    username: Joi.string().min(3).max(30).required(),
    //  date: Joi.date().iso().optional(), // ISO formatında tarih (örnek: 2024-07-17T12:00:00Z) yorum oluşturma tarihi now
    productId: Joi.number().integer().required(),
  });

  return schema.validate(comment);
};
