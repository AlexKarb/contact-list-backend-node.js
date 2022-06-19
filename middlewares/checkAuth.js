const jwt = require('jsonwebtoken');
const { User } = require('../models/users');
const { Unauthorized } = require('http-errors');
const { SECRET_KEY } = process.env;

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(new Unauthorized('Not authorized'));
  }

  try {
    const { id: userId } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(userId);
    const tokenIsActual = user?.token === token;

    if (!user || !tokenIsActual) next(new Unauthorized('Not authorized'));

    req.user = user;
    next();
  } catch {
    next(new Unauthorized('Not authorized'));
  }
};

module.exports = checkAuth;
