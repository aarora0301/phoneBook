/**
 * The entry point for model, controller or route.
 * Exposing the model is important, since otherwise it won't be registered
 * to `mongoose`
 * @type {{controller: ({get}|*), route, model: *}}
 */
module.exports = {
  controller: require('./controller'),
  route: require('./route'),
  model: require('./model'),
};
