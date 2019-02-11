const express = require('express');

const router = express.Router();

// any new resource api should imported here and then registered to
// router with proper api endpoint prefix (e.g /user user.route, /items items.route etc.)
const user = require('./user');
const contactsList = require('./contactsList');

router.use('/users', user.route);
router.use('/contactsList', contactsList.route);

module.exports = router;
