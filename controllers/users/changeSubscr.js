const { NotFound } = require('http-errors');
const { User } = require('../../models/users');

const changeSubscr = async ({ body, user }, res, next) => {
  const result = await User.findByIdAndUpdate(user._id, body, {
    new: true,
  }).select('-password -token -_id');

  if (!result) next(new NotFound('Not found'));

  res.json(result);
};

module.exports = changeSubscr;
