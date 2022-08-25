const Joi = require('joi');

const verify = Joi.object({
  email: Joi.string().required().messages({
    'any.required': 'missing required field email',
  }),
});

const signup = Joi.object({
  password: Joi.string().min(6).max(12).required().messages({
    'any.required': 'Password is required',
  }),
  email: Joi.string().required().messages({
    'any.required': 'Email is required',
  }),
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
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

module.exports = { verify, signup, login, changeSubscr };
