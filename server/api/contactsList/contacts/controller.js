const commonRepository = require('@api/common').repository;
const apiConfig = require('@config').API;

function get(id, limit) {
  const findOne = Boolean(id);
  limit = !findOne ? limit || apiConfig.RESPONSE_COUNT_LIMIT : null;
  const query = findOne ? { _id: id } : {};
  return commonRepository.getOneOrAll('Contacts', query, null, limit, findOne);
}

function save(payload) {
  return commonRepository.save(null, 'Contacts', payload, null);
}

function getByListId(contactListId) {
  return commonRepository.getOneOrAll('Contacts', { contactListId }, null, null, false);
}

module.exports = {
  save,
  getByListId,
};
