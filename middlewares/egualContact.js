const { Contact } = require('../models/contact');
const { BadRequest } = require('http-errors');

const equalContact = async ({ body, user: { _id: owner } }, res, next) => {
  const { email, phone } = body;

  const result = await Contact.findOne({ $set: { email, phone }, owner });

  if (result) next(new BadRequest('Email or Phone is required'));

  next();
};

module.exports = equalContact;
