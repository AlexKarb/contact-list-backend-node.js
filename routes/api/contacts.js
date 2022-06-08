const express = require('express');
const router = express.Router();

const { joiContactSchema } = require('../../models/contact/joiSchema');
const { ctrlWrapper, validate } = require('../../middlewares');
const { contacts } = require('../../controllers/');

router.get('/', ctrlWrapper(contacts.getAll));

router.get('/:contactId', ctrlWrapper(contacts.getById));

router.post('/', validate(joiContactSchema), ctrlWrapper(contacts.add));

router.delete('/:contactId', ctrlWrapper(contacts.remove));

router.put(
  '/:contactId',
  validate(joiContactSchema),
  ctrlWrapper(contacts.update),
);

module.exports = router;
