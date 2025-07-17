const Joi = require("joi");

exports.validateRegister = async function (user) {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(100).required().email(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(user);
};

exports.validateLogin = async function (user) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(100).required().email(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(user);
};
