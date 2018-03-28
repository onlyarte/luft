const Connection = require('../models/Connection');

const add = function insertConnection(connection) {
  return Connection.create(connection)
    .then(inserted => inserted.toObject());
};

module.exports.add = add;
