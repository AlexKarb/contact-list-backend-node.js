const contactFileOperation = require('./contactFileOperation');

const listContacts = async () => {
  return await contactFileOperation.readFile();
};

const getById = async contactId => {
  const allList = await listContacts();
  return (await allList?.find(({ id }) => id === contactId)) || null;
};

const removeContact = async contactId => {
  const allList = await listContacts();
  const haveContact = await getById(contactId);

  if (!haveContact) return null;

  const newList = await allList?.filter(({ id }) => id !== contactId);
  await contactFileOperation.writeInFile(newList);
  return newList;
};

const addContact = async body => {
  const allList = await listContacts();

  const haveMatchPhoneInList = await allList?.find(
    contact => contact.phone === body.phone,
  );

  if (haveMatchPhoneInList) {
    return null;
  } else {
    await allList.push(body);
    await contactFileOperation.writeInFile(allList);
    return body;
  }
};

const updateContact = async (contactId, body) => {
  const allList = await listContacts();
  const idx = allList.findIndex(contact => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  allList[idx] = { ...body, contactId };
  await contactFileOperation.writeInFile(allList);
  return allList[idx];
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
