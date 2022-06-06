const { NotFound } = require('http-errors');
const contactOperation = require('../../models/contacts');

const getById = async (req, res) => {
  const contactById = await contactOperation.getById(req.params.contactId);

  if (!contactById) {
    throw new NotFound('Not found');
  }

  res.json(contactById);
};

module.exports = getById;
