const mongoConfig = {
  local: {
    MONGO_HOST: '127.0.0.1',
    MONGO_PORT: '27017',
  },
  development: {
    MONGO_HOST: '',
    MONGO_PORT: '',
  },
};

const defaultConfig = {
  SERVER_NAME: 'Phonebook',
  DEFAULT_PORT: 8282,
  MONGO_DB_NAME: 'yellow-pages',
  API: {
    RESPONSE_COUNT_LIMIT: 10,
  },
};

module.exports = Object.assign(defaultConfig, mongoConfig[process.env.NODE_ENV || 'local']);
