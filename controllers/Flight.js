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
  return Flight.aggregate([
    {
      $lookup: {
        from: 'Connection',
        localField: 'connection',
        foreignField: '_id',
        as: 'connectionDoc',
      },
    },
    {
      $match: {
        date: { $eq: date },
        'connectionDoc.originAirportId': { $eq: originAirportId },
        'connectionDoc.destinationAirportId': { $eq: destinationAirportId },
      },
    },
  ])
    .then(flights => (
      Flight.populate(flights, [
        { path: 'plane' },
        { path: 'connection' },
      ])
        .exec()
    ))
    .exec();
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

const cancel = function findFlightByIdAndSetStatusCanceled(flightId) {
  return Flight.findByIdAndUpdate(flightId, { status: 'canceled' })
    .populate('plane')
    .populate('connection')
    .exec()
    .then(updated => updated.toObject());
};

module.exports.get = get;
module.exports.getAll = getAll;
module.exports.find = find;
module.exports.add = add;
module.exports.cancel = cancel;
