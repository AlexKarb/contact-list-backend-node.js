const express = require('express');
const router = express.Router();

const { joiSchema } = require('../../models/contact');

const {
  ctrlWrapper,
  validate,
  checkAuth,
  equalContact,
} = require('../../middlewares');
const { contacts } = require('../../controllers/');

router.get('/', checkAuth, ctrlWrapper(contacts.getAll));

router.get('/:contactId', checkAuth, ctrlWrapper(contacts.getById));

router.post(
  '/',
  checkAuth,
  validate(joiSchema.contact),
  equalContact,
  ctrlWrapper(contacts.add),
);

router.delete('/:contactId', checkAuth, ctrlWrapper(contacts.remove));

router.put(
  '/:contactId',
  checkAuth,
  validate(joiSchema.contact),
  ctrlWrapper(contacts.update),
);

router.patch(
  '/:contactId/favorite',
  checkAuth,
  validate(joiSchema.favUpdate),
  ctrlWrapper(contacts.updateStatusContact),
);

module.exports = router;
