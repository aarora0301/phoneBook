const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressValidator = require('express-validator');
const passport = require('passport');
const session = require('express-session');
const commonErrorHandler = require('./commonErrorHandler');
const connectionManager = require('./connectionManager');
const errorUtils = require('../error.utils');

/**
 * The main entry point that creates the app instance which later spins
 * up as server.
 * @param indexFilePath The path of index.html that it should serve
 * @param resourceDir The path of static files dir it should be serving
 * @returns {Function}
 */
function initiate() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(expressValidator());
  app.use(session({
    secret: 'passport', cookie: { maxAge: 6000 }, resave: false, saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  commonErrorHandler.attachWithApp(app);
  connectionManager.initializeDB();
  // app.get('/', function (req, res) {
  //   res.sendFile(indexFilePath);
  // });

  return app;
}

module.exports = {
  initiate,
};
