const { User } = require('../../models/users');
const { Unauthorized } = require('http-errors');

const getCurrent = async ({ user: { _id } }, res, next) => {
  const user = await User.findById(_id, 'email subscription -_id');

  if (!user) {
    throw new Unauthorized('Not authorized');
  }

  res.json(user);
};

module.exports = getCurrent;
