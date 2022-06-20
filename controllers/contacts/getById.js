const { NotFound } = require('http-errors');
const { Contact } = require('../../models/contact');

const getById = async ({ user, params }, res, next) => {
  const { _id: owner } = user;
  const { contactId: _id } = params;

  const result = await Contact.findOne({ _id, owner }).populate(
    'owner',
    'email subscription',
  );

  if (!result) next(new NotFound('Not found'));

  res.json(result);
};

module.exports = getById;
