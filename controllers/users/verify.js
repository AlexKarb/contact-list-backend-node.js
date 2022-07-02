const { NotFound, BadRequest } = require('http-errors');
const { User } = require('../../models/users');
const { sendMail } = require('../../service');
const { PORT = 3080 } = process.env;

const verifyEmail = (to, token) => {
  return {
    to,
    subject: 'verify your email',
    html: `<p>click on link for autotentification your email http://localhost:${PORT}/api/users/verify/${token}</p>`,
  };
};

const send = async ({ params: { verificationToken } }, res) => {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new NotFound('User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.json({ message: 'Verification successful' });
};

const resend = async ({ body: { email } }, res, next) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound('User not found');
  }

  const { verify, verificationToken, _id } = user;

  if (!verify) {
    await sendMail(verifyEmail(email, verificationToken));

    await User.findByIdAndUpdate(_id, {
      verificationToken: null,
      verify: true,
    });

    res.json({ message: 'Verification email sent' });
  } else {
    throw new BadRequest('Verification has already been passed');
  }
};

module.exports = { send, resend, verifyEmail };
