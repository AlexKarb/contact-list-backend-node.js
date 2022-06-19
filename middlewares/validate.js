const { BadRequest } = require('http-errors');

const validate = schema => (req, res, next) => {
  if (!req._body) next(new BadRequest('missing fields'));

  const { error } = schema.validate(req.body);

  if (error) {
    next(new BadRequest(error.details[0].message || 'missing fields'));
  }

  next();
};

module.exports = validate;
