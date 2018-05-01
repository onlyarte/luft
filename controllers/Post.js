const Post = require('../models/Post');

const get = function findPostById(postId) {
  return Post.findById(postId)
    .exec()
    .then(post => post.toObject());
};

const getAll = function findAllPosts() {
  return Post.find({ })
    .exec();
};

const add = function insertPost(post) {
  return Post.create(post)
    .then(inserted => inserted.toObject());
};

const update = function updateAirport(postId, updates) {
  return Post.findByIdAndUpdate(postId, updates, { new: true })
    .exec()
    .then(updated => updated.toObject());
};

const remove = function removePost(postId) {
  return Post.deleteOne({ _id: postId })
    .exec();
};

module.exports.get = get;
module.exports.getAll = getAll;
module.exports.add = add;
module.exports.update = update;
module.exports.remove = remove;
