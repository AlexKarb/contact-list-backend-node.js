const { model, Schema } = require('mongoose');
const { SECRET_KEY } = process.env;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const saltRounds = 10;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Email is required'],
    },
    avatarURL: {
      type: String,
      required: [true, 'Avatar is required'],
      default: gravatar.url(this.email, { protocol: 'https', s: '300' }),
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },

    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false },
);

userSchema.method({
  setPassword: async function (password) {
    this.password = await bcrypt.hash(password, saltRounds);
  },

  validPassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },

  setToken: function (id) {
    return (this.token = jwt.sign({ id }, SECRET_KEY, {
      expiresIn: '8h',
    }));
  },
});

const User = model('user', userSchema);

module.exports = User;
