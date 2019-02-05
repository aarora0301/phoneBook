const { check } = require('express-validator/check');

module.exports = {
  requestValidator: [
    check('user[email]', 'email is required').exists(),
    check('user[email]', 'email cannot be empty').not().isEmpty(),
    check('user[password]', 'password is required').exists(),
    check('user[password]', 'password cannot be empty').not().isEmpty(),

  ],
  errorFormatter: ({
    msg, param, value, nestedErrors,
  }) => ({
    type: 'Error',
    name: 'Signup Failure',
    message: msg,
    param,
    value,
    nestedErrors,
  }),
};
