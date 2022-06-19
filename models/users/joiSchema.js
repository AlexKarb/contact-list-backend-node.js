const Joi = require('joi');

const signup = Joi.object({
  password: Joi.string().min(6).max(12).required().messages({
    'any.required': 'Password is required',
  }),
  email: Joi.string().required().messages({
    'any.required': 'Email is required',
  }),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const login = Joi.object({
  password: Joi.string().min(6).max(12).required().messages({
    'any.required': 'Password is required',
  }),
  email: Joi.string().required().messages({
    'any.required': 'Email is required',
  }),
});

const changeSubscr = Joi.object({
  subscription: Joi.valid('starter', 'pro', 'business').required().messages({
    'any.required': 'missing field subscription',
  }),
});

module.exports = { signup, login, changeSubscr };
