const { NotFound } = require('http-errors');
const { Contact } = require('../../models/contact');

const add = async ({ body: userData, user: { _id: owner } }, res, next) => {
  const result = await Contact.create({ ...userData, owner });

  if (!result) next(new NotFound('Not found'));

  res.status(201).json(result);
};

module.exports = add;
