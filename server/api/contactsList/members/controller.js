const commonRepository = require('@api/common').repository;
const apiConfig = require('@config').API;

function get(id, limit) {
  const findOne = Boolean(id);
  limit = !findOne ? limit || apiConfig.RESPONSE_COUNT_LIMIT : null;
  const query = findOne ? { _id: id } : {};
  return commonRepository.getOneOrAll('Members', query, null, limit, findOne);
}

function save(payload) {
  return commonRepository.save(null, 'Members', payload, null);
}

function getByListId(contactListId) {
  return commonRepository.getOneOrAll('Members', { contactListId }, null, null, false);
}

module.exports = {
  save,
  getByListId,

};
