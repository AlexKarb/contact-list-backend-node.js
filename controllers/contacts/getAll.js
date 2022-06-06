const contactOperation = require('../../models/contacts');

const getAll = async (req, res) => {
  const listContacts = await contactOperation.listContacts();
  res.json(listContacts);
};

module.exports = getAll;
