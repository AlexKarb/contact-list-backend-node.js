const { NotFound } = require('http-errors');
const { Contact } = require('../../models/contact');

const remove = async ({ params: { contactId } }, res) => {
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw new NotFound('Not found');
  }

  res.json({ message: 'contact deleted' });
};

module.exports = remove;
