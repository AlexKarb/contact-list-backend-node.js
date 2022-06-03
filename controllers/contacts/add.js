const { NotFound } = require('http-errors');
const { v4 } = require('uuid');
const contactOperation = require('../../models/contacts');

const add = async (req, res) => {
  const result = await contactOperation.addContact({ ...req.body, id: v4() });

  if (!result) {
    throw new NotFound('Not found');
  }

  res.status(201).json(result);
};

module.exports = add;
