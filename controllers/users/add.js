const { User } = require('../../models/users');
const { Conflict } = require('http-errors');
const { v4 } = require('uuid');
const { sendMail } = require('../../service');
const { verifyEmail } = require('../../controllers/users/verify');

const add = async (req, res, next) => {
  const { password, email, ...dataOfUser } = req.body;

  const user = await User.findOne({ email });
  if (user) next(new Conflict('Email in use'));

  const verificationToken = v4();

  const newUser = new User({ email, ...dataOfUser, verificationToken });
  await newUser.setPassword(password);
  await User.create(newUser);

  await sendMail(verifyEmail(email, verificationToken));

  res.json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = add;
