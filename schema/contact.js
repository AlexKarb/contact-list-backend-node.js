const Joi = require('joi');

const schemaContact = Joi.object({
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
});

module.exports = schemaContact;
