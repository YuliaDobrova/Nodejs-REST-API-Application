const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(`error.message`, error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const oneContact = contacts.find((item) => String(item.id) === contactId);
    if (!oneContact) {
      return null;
    }
    return oneContact;
  } catch (error) {
    console.log(`error.message`, error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const idx = contacts.findIndex(
      (contact) => String(contact.id) === contactId
    );
    if (idx === -1) {
      return null;
    }
    const removeContact = contacts[idx];
    contacts.splice(idx, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removeContact;
  } catch (error) {
    console.log(`error.message`, error.message);
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: v4(), ...body };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(`error.message`, error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const updContactIndex = contacts.findIndex(
      (contact) => String(contact.id) === String(contactId)
    );
    if (updContactIndex === -1) {
      return null;
    }
    contacts[updContactIndex] = { id: contactId, ...body };
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[updContactIndex];
  } catch (error) {
    console.log(`error.message`, error.message);
  }
};

const contactOperations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

module.exports = contactOperations;
