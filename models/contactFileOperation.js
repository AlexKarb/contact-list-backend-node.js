const fs = require('fs/promises');
const contactsPath = require('./getContactsPath');

async function readFile() {
  const res = await fs.readFile(contactsPath, 'utf-8');
  return await JSON.parse(res);
}

async function writeInFile(data) {
  fs.writeFile(contactsPath, JSON.stringify(data));
}

module.exports = { readFile, writeInFile };
