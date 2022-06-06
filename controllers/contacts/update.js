const { NotFound } = require('http-errors');
const contactOperation = require('../../models/contacts');

const update = async (req, res) => {
  const {
    params: { contactId },
    body,
  } = req;

  const updateContact = await contactOperation.updateContact(contactId, body);

  if (!updateContact) {
    throw new NotFound('Not found');
  }

  res.json(updateContact);
};

module.exports = update;
