const express = require('express');
const statusCodes = require('http-status-codes');
const auth = require('@api/common').auth;
const v = require('@api/user/validation');
const { check, validationResult } = require('express-validator/check');
const controller = require('./controller');


// we might need to access all the routing params from parent as well,
// so the better practice is to have mergeParams: true
const router = express.Router({ mergeParams: true });

function post(req, res) {
  const errors = validationResult(req).formatWith(v.errorFormatter);

  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
  } else {
    const result = controller.save(req);
    result
      .then((user) => {
        res.json({ user: controller.sendAuthUser(user) });
      }).catch((err) => {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).send(err);
      });
  }
}

function get(req, res) {
  const errors = validationResult(req, res).formatWith(v.errorFormatter);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
  } else {
    console.log(`read ${controller.getUser(req, res)}`);
    try {
      controller.getUser(req, res);
    } catch (err) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}

router.post('/', auth.optional, v.requestValidator, post);
router.post('/login', auth.optional, v.requestValidator, get);
module.exports = router;
