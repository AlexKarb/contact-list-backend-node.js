const { NotFound } = require('http-errors');
const { Contact } = require('../../models/contact');

const add = async ({ body }, res) => {
  const result = await Contact.create(body);

  if (!result) {
    throw new NotFound('Not found');
  }

  res.status(201).json(result);
};

module.exports = add;
