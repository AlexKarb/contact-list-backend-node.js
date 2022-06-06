const express = require('express');
const router = express.Router();
const schema = require('../../schema');

const { ctrlWrapper, validate } = require('../../middlewares');
const { contacts } = require('../../controllers/');

router.get('/', ctrlWrapper(contacts.getAll));

router.get('/:contactId', ctrlWrapper(contacts.getById));

router.post('/', validate(schema.contact), ctrlWrapper(contacts.add));

router.delete('/:contactId', ctrlWrapper(contacts.remove));

router.put(
  '/:contactId',
  validate(schema.contact),
  ctrlWrapper(contacts.update),
);

module.exports = router;
