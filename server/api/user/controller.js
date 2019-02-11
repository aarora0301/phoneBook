const isEmpty = require('lodash/isEmpty');
const commonRepository = require('@api/common').repository;
const apiConfig = require('@config').API;
const passport = require('@api/user/passport');

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

    // needs improvment, function should have consistent return type
    if (isUserPresent) return Promise.reject('User Already exists');
    return commonRepository.save(null, null, null, (createUser(request)));
  } catch (err) {
    return Promise.reject(err);
  }
}

function sendAuthUser(user) {
  return user.toAuthJSON();
}

function getUser(req, res) {
  return passport.authenticate('local', (err, user, info) => {
    if (err) {
      throw err;
    }

    if (user) {
      const _user = user;
      _user.token = user.generateJWT();
      return res.json({ user: _user.toAuthJSON() }); // needs improvement res to be set in route only
    }
    return res.status(400).json(info);
  })(req, res);
}


module.exports = {
  sendAuthUser,
  save,
  getUser,

};
