const { NotFound } = require('http-errors');
const { Contact } = require('../../models/contact');

const updateStatusContact = async ({ params: { contactId }, body }, res) => {
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!result) {
    throw new NotFound('Not found');
  }

  res.json(result);
};

module.exports = updateStatusContact;
