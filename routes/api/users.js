const express = require('express');
const router = express.Router();

const { joiSchema } = require('../../models/users');
const {
  ctrlWrapper,
  validate,
  checkAuth,
  upload,
} = require('../../middlewares');
const { users } = require('../../controllers');

router.post('/signup', validate(joiSchema.signup), ctrlWrapper(users.add));

router.post('/login', validate(joiSchema.login), ctrlWrapper(users.login));

router.get('/logout', checkAuth, ctrlWrapper(users.logout));

router.get('/current', checkAuth, ctrlWrapper(users.getCurrent));

router.patch(
  '/avatars',
  checkAuth,
  upload.single('avatar'),
  ctrlWrapper(users.changeAvatar),
);

router.patch(
  '/subscription',
  checkAuth,
  validate(joiSchema.changeSubscr),
  ctrlWrapper(users.changeSubscr),
);

module.exports = router;
