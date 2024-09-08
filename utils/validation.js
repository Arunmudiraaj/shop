const Joi = require('joi');

// general validation function for consistent error objects
exports.handleValidation = async (errorObj) => {
  const { error } = errorObj;
  if (error) {
    return { isValid: false, error_msg: error.details[0].message };
  } else {
    return { isValid: true };
  }
};

// auth validations
exports.registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    roleId: Joi.number(),
  });

  return handleValidation(schema.validate(data));
};

exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().required()
  });

  return handleValidation(schema.validate(data));
};

// product validations
exports.createProductValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(5).required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0).required(),
    imageUrl: Joi.string(),
  });

  return handleValidation(schema.validate(data));
};

// cart validations
exports.addItemToCartValidation = (data) => {
  const schema = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
  });
  return handleValidation(schema.validate(data));
};

