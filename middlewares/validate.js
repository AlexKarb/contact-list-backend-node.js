const { BadRequest } = require('http-errors');

const validate = schema => (req, res, next) => {
  if (!req._body) {
    next(new BadRequest('missing fields'));
  }

  const { error } = schema.validate(req.body);

  if (error) {
    const text = error.details[0].message || 'missing fields';
    next(new BadRequest(text));
  }

  next();
};

module.exports = validate;
