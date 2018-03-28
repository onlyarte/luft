const Airport = require('../models/Airport');

const get = function findAirportById(airportId) {
  return Airport.findById(airportId)
    .exec()
    .then(airport => airport.toObject());
};

const getAll = function findAllAirports() {
  return Airport.find({ })
    .exec();
};

const add = function insertAirport(airport) {
  return Airport.create(airport)
    .then(inserted => inserted.toObject());
};

const update = function updateAirport(airportId, updates) {
  return Airport.findByIdAndUpdate(airportId, updates, { new: true })
    .exec()
    .then(updated => updated.toObject());
};

const remove = function removeAirport(airportId) {
  return Airport.deleteOne({ _id: airportId })
    .exec();
};

module.exports.get = get;
module.exports.getAll = getAll;
module.exports.add = add;
module.exports.update = update;
module.exports.remove = remove;
