const { NotFound } = require('http-errors');
const { Contact } = require('../../models/contact');

const update = async ({ params, body, user }, res, next) => {
  const { _id: owner } = user;
  const { contactId: _id } = params;

  const result = await Contact.findOneAndUpdate({ _id, owner }, body, {
    new: true,
  });

  if (!result) next(new NotFound('Not found'));

  res.json(result);
};

module.exports = update;
