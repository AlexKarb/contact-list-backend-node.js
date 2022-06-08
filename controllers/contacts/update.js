const { NotFound } = require('http-errors');
const { Contact } = require('../../models/contact');

const update = async ({ params: { contactId }, body }, res) => {
  const result = await Contact.findByIdAndUpdate(contactId, body);

  if (!result) {
    throw new NotFound('Not found');
  }

  res.json(result);
};

module.exports = update;
