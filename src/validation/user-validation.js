import Joi from "joi";

const registerUserValidation = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).required(),
  gender: Joi.string().max(1).required(),
  date_of_birth: Joi.date().iso().required(),
  phone: Joi.string().max(20).required(),
  email: Joi.string().email().max(200).required(),
  password: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().email().max(200).required(),
  password: Joi.string().max(100).required(),
});

export { registerUserValidation, loginUserValidation };
