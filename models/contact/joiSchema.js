const Joi = require('joi');

const joiContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'missing required name field',
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'any.required': 'missing required email field',
    }),
  phone: Joi.string().min(10).max(18).required().messages({
    'any.required': 'missing required phone field',
  }),
  favorite: Joi.bool(),
});

const joiFavoriteUpdateSchema = Joi.object({
  favorite: Joi.bool().required().messages({
    'any.required': 'missing field favorite',
  }),
});

module.exports = {
  joiContactSchema,
  joiFavoriteUpdateSchema,
};
