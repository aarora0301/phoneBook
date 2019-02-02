const mongoose = require('mongoose');
const config = require('@config');
const logger = require('./logger');

function initializeDB() {
  const dbUrl = `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DB_NAME}`;
  return initializeDBUsingURI(dbUrl);
}

function initializeDBUsingURI(uri) {
  mongoose.set('debug', true);
  return mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
      logger.log('Mongoose - Initialization successful');
    })
    .catch((err) => {
      logger.log('Mongoose - Initialization failed', err);
    });
}

function stopDB() {
  return mongoose.disconnect().then(() => {
    logger.log('Mongoose - DB has been stopped');
  });
}

module.exports = {
  initializeDB,
  initializeDBUsingURI,
  stopDB,

};
