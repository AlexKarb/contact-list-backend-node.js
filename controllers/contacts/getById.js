const { NotFound } = require('http-errors');
const { Contact } = require('../../models/contact');

const getById = async ({ params: { contactId } }, res) => {
  const result = await Contact.findById(contactId);

  if (!result) {
    throw new NotFound('Not found');
  }

  res.json(result);
};

module.exports = getById;
