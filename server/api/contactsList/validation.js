const { check } = require('express-validator/check');

module.exports = {
  requestValidator: [
    check('name', 'name is required').exists(),
    check('name', 'name cannot be empty').not().isEmpty(),
    check('createdBy', 'createdBy is required').exists(),
    check('createdBy', 'createdBy cannot be empty').not().isEmpty(),
    check('createdAt', 'createdAt is required').exists(),
    check('createdAt', 'createdAt cannot be empty').not().isEmpty(),
    check('type', 'type is required').exists(),
    check('type', 'type cannot be empty').not().isEmpty(),
  ],
  errorFormatter: ({
    msg, param, value, nestedErrors,
  }) => ({
    type: 'Error',
    name: 'Contacts List failure',
    message: msg,
    param,
    value,
    nestedErrors,
  }),
};
