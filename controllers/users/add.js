const { User } = require('../../models/users');
const { Conflict } = require('http-errors');

const add = async (req, res, next) => {
  const { password, email, ...dataOfUser } = req.body;

  const user = await User.findOne({ email });
  if (user) next(new Conflict('Email in use'));

  const newUser = new User(dataOfUser);
  await newUser.setPassword(password);
  await User.create(newUser);

  res.json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = add;
