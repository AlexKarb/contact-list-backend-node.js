const { Contact } = require('../../models/contact');

const getAll = async ({ user, query }, res) => {
  const { _id: owner } = user;
  const { page = 1, limit = 10, favorite = false } = query;

  const limitItem = parseInt(limit > 100 ? 100 : limit);
  const skip = parseInt(page) * limit - limit;
  const sort = JSON.parse(favorite) ? '-favorite' : {};

  const result = await Contact.find({ owner })
    .skip(skip)
    .limit(limitItem)
    .populate('owner', 'email subscription')
    .sort(sort);

  res.json(result);
};

module.exports = getAll;
