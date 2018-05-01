const Flight = require('../models/Flight');

const cast = function removeUnusedInfo(flight) {
  const processed = flight.toObject();

  // remove time stamp from date
  processed.date = processed.date.toISOString().slice(0, 10);

  // airport object to name
  processed.connection.originAirport
    = flight.connection.originAirport.name;
  processed.connection.destinationAirport
    = flight.connection.destinationAirport.name;
  return processed;
};

const get = function findFlightById(flightId) {
  return Flight.findById(flightId)
    .exec()
    .then(flight => (
      Flight.populate(flight, [
        { path: 'plane', select: '_id tailNum' },
        {
          path: 'connection',
          select: 'originAirport destinationAirport departureTime arrivalTime',
          populate: [
            { path: 'originAirport', select: 'name' },
            { path: 'destinationAirport', select: 'name' },
          ],
        },
      ])
    ))
    .then(cast);
};

const getAll = function findAllFlights() {
  return Flight.find({ })
    .populate('plane', '_id tailNum')
    .exec()
    .then(flights => (
      Flight.populate(flights, [
        { path: 'plane', select: '_id tailNum' },
        {
          path: 'connection',
          select: 'originAirport destinationAirport departureTime arrivalTime',
          populate: [
            { path: 'originAirport', select: 'name' },
            { path: 'destinationAirport', select: 'name' },
          ],
        },
      ])
    ))
    .then(flights => flights.map(cast));
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
