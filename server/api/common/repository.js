const mongoose = require('mongoose');

function getOneOrAll(modelName, queryData, sort, limit, findOne = false) {
  const queryMethod = findOne ? 'findOne' : 'find';
  const defaultResponse = findOne ? {} : [];

  queryData = queryData || {};

  let query = mongoose.model(modelName)[queryMethod](queryData);
  query = sort ? query.sort(sort) : query;
  query = limit ? query.limit(limit) : query;

  return new Promise((resolve, reject) => {
    query
      .exec((err, result) => {
        if (err) {
          return reject(err);
        }

        resolve(result || defaultResponse);
      });
  });
}

function save(existing, modelName, payload, newRecord) {
  let objectToSave = existing;

  if (!existing && !newRecord) {
    objectToSave = createModel(modelName, payload);
  } else objectToSave = newRecord;

  return new Promise((resolve, reject) => {
    objectToSave.save((err, saved) => {
      if (err) {
        return reject(err);
      }

      resolve(saved);
    });
  });
}

function remove(modelName, queryData, removeOne = false) {
  const queryMethod = removeOne ? 'deleteOne' : 'deleteMany';
  queryData = queryData || {};
  const query = mongoose.model(modelName)[queryMethod](queryData);
  return query.exec();
}

function createModel(modelName, payload) {
  const Model = mongoose.model(modelName);
  return new Model(payload);
}

module.exports = {
  getOneOrAll,
  save,
  remove,
  createModel,
};
