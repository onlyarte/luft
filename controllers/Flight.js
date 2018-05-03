const mongoose = require('mongoose');

const Flight = require('../models/Flight');
const Plane = require('../models/Plane');
const Connection = require('../models/Connection');
const Airport = require('../models/Airport');

const Price = require('./Price');

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
  originAirport,
  destinationAirport,
  date,
) {
  return Flight.aggregate([
    { $match: { date } },
    {
      $lookup: {
        from: Plane.collection.name,
        localField: 'plane',
        foreignField: '_id',
        as: 'plane',
      },
    },
    { $unwind: '$plane' },
    {
      $lookup: {
        from: Connection.collection.name,
        localField: 'connection',
        foreignField: '_id',
        as: 'connection',
      },
    },
    { $unwind: '$connection' },
    {
      $match: {
        'connection.originAirport': mongoose.Types.ObjectId(originAirport),
        'connection.destinationAirport': mongoose.Types.ObjectId(destinationAirport),
      },
    },
    {
      $lookup: {
        from: Airport.collection.name,
        localField: 'connection.originAirport',
        foreignField: '_id',
        as: 'connection.originAirport',
      },
    },
    { $unwind: '$connection.originAirport' },
    {
      $lookup: {
        from: Airport.collection.name,
        localField: 'connection.destinationAirport',
        foreignField: '_id',
        as: 'connection.destinationAirport',
      },
    },
    { $unwind: '$connection.destinationAirport' },
  ])
  // generate prices
    .then(flights => (
      Promise.all(flights.map(flight => (
        Price.add({
          flight: flight._id,
          amount: flight.price * flight.coefficient,
        })
          .then(price => ({ ...flight, price }))
      )))
    ));
  /* return Flight.find({ date })
    .then(flights => (
      Flight.populate(flights, [
        { path: 'plane' },
        {
          path: 'connection',
          populate: [
            { path: 'originAirport' },
            { path: 'destinationAirport' },
          ],
        },
      ])
    )); */
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

const update = function updateFlight(flightId, updates) {
  return Flight.findByIdAndUpdate(flightId, updates, { new: true })
    .exec()
    .then(updated => updated.toObject());
};

module.exports.get = get;
module.exports.getAll = getAll;
module.exports.find = find;
module.exports.add = add;
module.exports.update = update;
