const { User } = require('../../models/users');
const { Unauthorized } = require('http-errors');

const logout = async ({ user: { _id } }, res, next) => {
  const result = await User.findByIdAndUpdate(_id, { token: null });

  if (!result) next(new Unauthorized('Not authorized'));

  res.status(204).json();
};

module.exports = logout;
