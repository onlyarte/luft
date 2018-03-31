const Connection = require('../models/Connection');

const get = function findConnectionById(connectionId) {
  return Connection.findById(connectionId)
    .exec()
    .then(connection => connection.toObject);
};

const getAll = function findAllConnections() {
  return Connection.find({ })
    .exec();
};

const add = function insertConnection(connection) {
  return Connection.create(connection)
    .then(inserted => inserted.toObject());
};

const update = function updateConnection(connectionId, updates) {
  return Connection.findByIdAndUpdate(connectionId, updates, { new: true })
    .exec()
    .then(updated => updated.toObject());
};

const remove = function removeConnection(connectionId) {
  return Connection.deleteOne({ _id: connectionId })
    .exec();
};

module.exports.get = get;
module.exports.getAll = getAll;
module.exports.add = add;
module.exports.update = update;
module.exports.remove = remove;
