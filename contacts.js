const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const dataString = await fs.readFile(contactsPath, "utf8");
  const data = JSON.parse(dataString);
  return data;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  return contact ? contact : null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const deletedContact = allContacts.find(
    (contact) => contact.id === contactId
  );
  const newContactslist = allContacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContactslist));
  return deletedContact;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: uuid.v4(),
    name: name,
    email: email,
    phone: phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
