const User = require('../models/User');

const get = function findUserById(userId) {
  return User.findById(userId, '-password')
    .exec()
    .then(user => user.toObject());
};

const getPassword = function findUserPasswordByEmail(email) {
  return User.findOne({ email })
    .exec()
    .then(user => user.toObject().password);
};

const add = function insertUser(user) {
  return User.create(user)
    .then(inserted => inserted.toObject());
};

const update = function updateUser(userId, updates) {
  return User.findByIdAndUpdate(userId, updates, { new: true })
    .exec()
    .then(updated => updated.toObject());
};

const remove = function removeUser(userId) {
  return User.deleteOne({ _id: userId })
    .exec();
};

module.exports.get = get;
module.exports.getPassword = getPassword;
module.exports.add = add;
module.exports.update = update;
module.exports.remove = remove;
