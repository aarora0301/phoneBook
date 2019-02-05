const express = require('express');
const statusCodes = require('http-status-codes');
const auth = require('@api/common').auth;
const v = require('@api/contactsList/validation');
const { check, validationResult } = require('express-validator/check');
const controller = require('./controller');

const router = express.Router({ mergeParams: true });

function post(req, res) {
  const errors = validationResult(req).formatWith(v.errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  return controller.save(req)
    .then(result => res.json({ message: 'list saved successfully', id: result.id }))
    .catch(err => res.json({ message: 'not able to save list' }));
}

function get(req, res) {
  const id = req.query.id;
  console.log(id);
  if (id) {
    return controller.getById(id)
      .then(result => res.json({ contactsList: result }))
      .catch(err => res.json({ message: `not such contacts list exist with id ${id}` }));
  }
  const params = req.query.includePrivate;
  if (params === 'true') {
    return controller.getByType('private')
      .then(result => res.json({ contactsList: result }))
      .catch(err => res.json({ message: 'not able to get list' }));
  }

  return controller.getByType('public')
    .then(result => res.json({ contactsList: result }))
    .catch(err => res.json({ message: 'not able to get list' }));
}

router.post('/', auth.required, v.requestValidator, post);
router.get('/', auth.required, get);
module.exports = router;
