const isEmpty = require('lodash/isEmpty');
const commonRepository = require('@api/common').repository;
const apiConfig = require('@config').API;

function get(id, limit) {
  const findOne = Boolean(id);
  limit = !findOne ? limit || apiConfig.RESPONSE_COUNT_LIMIT : null;
  const query = findOne ? { _id: id } : {};
  return commonRepository.getOneOrAll('Users', query, null, limit, findOne);
}

function createUser(request) {
  const user = commonRepository.createModel('Users', request.body.user);
  user.setPassword(request.body.user.password);
  return user;
}


function getByEmail(email) {
  return commonRepository.getOneOrAll('Users', { email }, null, null, true);
}

async function save(request) {
  try {
    const existingUser = await getByEmail(request.body.user.email);
    const isUserPresent = !isEmpty(existingUser);
    return isUserPresent ? 'User Already Exists' : commonRepository.save(null, null, null, createUser(request));
  } catch (err) {
    return Promise.reject(err);
  }
}

function validateUserRequest(request, res) {
  const response = {};
  if (!request.body.user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!request.body.user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
}

function getAuthUser(user) {
  return user.toAuthJSON();
}

module.exports = {
  getAuthUser,
  validateUserRequest,
  save,

};
