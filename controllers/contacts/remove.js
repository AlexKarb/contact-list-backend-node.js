const { NotFound } = require('http-errors');
const contactOperation = require('../../models/contacts');

const remove = async (req, res) => {
  const { params } = req;
  const deteleContact = await contactOperation.removeContact(params.contactId);

  if (!deteleContact) {
    throw new NotFound('Not found');
  }

  res.json({ message: 'contact deleted' });
};

module.exports = remove;
