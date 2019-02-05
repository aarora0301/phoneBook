const commonRepository = require('@api/common').repository;
const apiConfig = require('@config').API;

function get(id, limit) {
  const findOne = Boolean(id);
  limit = !findOne ? limit || apiConfig.RESPONSE_COUNT_LIMIT : null;
  const query = findOne ? { _id: id } : {};
  return commonRepository.getOneOrAll('Users', query, null, limit, findOne);
}

function save(request) {
  return commonRepository.save(null, 'ContactsList', request.body, null);
}

function getByType(type) {
  return commonRepository.getOneOrAll('ContactsList', { type }, null, null, false);
}

function getById(_id) {
  return commonRepository.getOneOrAll('ContactsList', { _id }, null, null, true);
}

module.exports = {
  save,
  getByType,
  getById,
};
