const { NotFound } = require('http-errors');
const { Contact } = require('../../models/contact');

const remove = async ({ params, user }, res, next) => {
  const { _id: owner } = user;
  const { contactId: _id } = params;

  const result = await Contact.findOneAndRemove({ _id, owner });

  if (!result) next(new NotFound('Not found'));

  res.json({ message: 'contact deleted' });
};

module.exports = remove;
