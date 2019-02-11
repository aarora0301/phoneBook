const { check } = require('express-validator/check');
const isEmpty = require('lodash/isEmpty');
const contactsListController = require('../controller');

module.exports = {
  requestValidator: [
    check('name', 'name is required').exists(),
    check('name', 'name cannot be empty').not().isEmpty(),
    check('numbers', 'numbers is required').exists(),
    check('numbers', 'numbers cannot be empty').not().isEmpty(),
    check('id').custom((value) => {
      console.log(`id : ${value}`);
      return contactsListController.getById(value)
        .then((result) => {
          console.log(`inside then : ${result}`);
          if (!result) {
            throw new Error('no such id exist');
          }
        });
    }),

  ],

  getrequestValidator: [
    check('id').custom(value => contactsListController.getById(value)
      .then((result) => {
        console.log(`inside then : ${result}`);
        if (!result) {
          throw new Error('no such id exist');
        }
      })),
  ],
  errorFormatter: ({
    msg, param, value, nestedErrors,
  }) => ({
    type: 'Error',
    name: 'Contacts validation failure',
    message: msg,
    param,
    value,
    nestedErrors,
  }),
};
