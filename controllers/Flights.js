const Flight = require('../models/Flight');

const find = function findFlightByOriginAndDestination(
  originAirportId,
  destinationAirportId,
  date,
) {
  return Flight.aggregate([
    {
      $lookup: {
        from: 'Connection',
        localField: 'connectionId',
        foreignField: '_id',
        as: 'connection',
      },
    },
    {
      $match: {
        date: { $eq: date },
        'connection.originAirportId': { $eq: originAirportId },
        'connection.destinationAirportId': { $eq: destinationAirportId },
      },
    },
  ]);
};

const add = function insertFlight(flight) {
  return Flight.create(flight)
    .then(inserted => inserted.toObject());
};

module.exports.find = find;
module.exports.add = add;
