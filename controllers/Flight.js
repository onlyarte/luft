const Flight = require('../models/Flight');

const get = function findFlightById(flightId) {
  return Flight.findById(flightId)
    .populate('plane')
    .populate('connection')
    .exec()
    .then(flight => flight.toObject());
};

const getAll = function findAllFlights() {
  return Flight.find({ })
    .populate('plane')
    .populate('connection')
    .exec();
};

const find = function findFlightByOriginAndDestination(
  originAirportId,
  destinationAirportId,
  date,
) {
  return Flight.find({ date })
    .then(flights => (
      Flight.populate(flights, [
        { path: 'plane' },
        {
          path: 'connection',
          populate: [
            { path: 'originAirportId' },
            { path: 'destinationAirportId' },
          ],
        },
      ])
    ));
};

const add = function insertFlight(flight) {
  return Flight.create(flight)
    .then(inserted => (
      Flight.populate(inserted.toObject(), [
        { path: 'plane' },
        { path: 'connection' },
      ])
    ));
};

module.exports.get = get;
module.exports.getAll = getAll;
module.exports.find = find;
module.exports.add = add;
