const nodemailer = require('nodemailer');
const Joi = require('joi');

const { META_PASSWORD } = process.env;

const emailSchema = Joi.object({
  to: Joi.string().required().messages({
    'any.required': 'Email is required',
  }),
  subject: Joi.string().required().messages({
    'any.required': 'Subject is required',
  }),
  text: Joi.string(),
  html: Joi.string().required().messages({
    'any.required': 'html is required',
  }),
});

const transporter = nodemailer.createTransport({
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'alex.work97@meta.ua',
    pass: META_PASSWORD,
  },
});

const sendMail = async email => {
  const { error } = emailSchema.validate(email);

  if (error) {
    throw new Error(error);
  }

  try {
    await transporter.sendMail({
      ...email,
      from: 'alex.work97@meta.ua',
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendMail;
