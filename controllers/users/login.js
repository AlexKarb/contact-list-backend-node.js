const { User } = require('../../models/users');
const { Unauthorized, Forbidden } = require('http-errors');
const { sendMail } = require('../../service');

const login = async ({ body: { email, password } }, res) => {
  const userInDb = await User.findOne({ email });
  const passwordIsValid = await userInDb?.validPassword(password);

  if (userInDb && !userInDb.verify) {
    throw new Forbidden('Email not verify');
  }

  if (!userInDb || !passwordIsValid) {
    throw new Unauthorized('Email or password is wrong');
  }

  const token = await userInDb.setToken(userInDb._id);

  const user = await User.findByIdAndUpdate(userInDb._id, userInDb).select(
    'email subscription -_id',
  );

  return res.json({ code: 200, data: { token, user } });
};

module.exports = login;
