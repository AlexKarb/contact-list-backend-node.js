const { User } = require('../../models/users');
const { Unauthorized } = require('http-errors');

const login = async ({ body: { email, password } }, res, next) => {
  const userInDb = await User.findOne({ email });
  const passwordIsValid = await userInDb?.validPassword(password);

  if (!userInDb || !passwordIsValid) {
    next(new Unauthorized('Email or password is wrong'));
  }

  const token = await userInDb.setToken(userInDb._id);
  const user = await User.findByIdAndUpdate(userInDb._id, userInDb).select(
    'email subscription -_id',
  );

  res.json({ token, user });
};

module.exports = login;
