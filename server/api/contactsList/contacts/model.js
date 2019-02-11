const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
  name: String,
  numbers: [Number],
  mails: [String],
  company: String,
  tags: [String],
  contactListId: { type: String, ref: 'ContactsList' },
});

module.exports = mongoose.model('Contacts', ContactsSchema);
