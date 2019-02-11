const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PermissonSchema = new Schema({
  memberId: String,
  canEdit: Boolean,
  canAdd: Boolean,
  canDelete: Boolean,
  canShare: Boolean,
});

module.exports = mongoose.model('Contacts', ContactsSchema);
