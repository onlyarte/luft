const Plane = require('../models/Plane');

const get = function findPlaneById(planeId) {
  return Plane.findById(planeId)
    .exec()
    .then(plane => plane.toObject());
};

const getAll = function findAllPlanes() {
  return Plane.find({ })
    .exec();
};

const add = function insertPlane(plane) {
  return Plane.create(plane)
    .then(inserted => inserted.toObject());
};

const update = function updatePlane(planeId, updates) {
  return Plane.findByIdAndUpdate(planeId, updates, { new: true })
    .exec()
    .then(updated => updated.toObject());
};

const remove = function removePlane(planeId) {
  return Plane.deleteOne({ _id: planeId })
    .exec();
};

module.exports.get = get;
module.exports.getAll = getAll;
module.exports.add = add;
module.exports.update = update;
module.exports.remove = remove;
