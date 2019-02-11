const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MembersSchema = new Schema({
  name: String,
  addedBy: String,
  addedOn: Date,
  contactListId: { type: String, ref: 'ContactsList' },
});

module.exports = mongoose.model('Members', MembersSchema);
