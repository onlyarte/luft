const mongoose = require('mongoose');

const Ticket = require('../models/Ticket');
const Flight = require('./Flight');

const populateFlight = function flightIdToObject(ticket) {
  return Flight.get(ticket.flight)
    .then((flight) => {
      const formatted = { ...ticket };
      formatted.flight = {
        _id: flight._id,
        origin: flight.connection.originAirport,
        destination: flight.connection.destinationAirport,
        departure: flight.connection.departureTime,
        arrival: flight.connection.arrivalTime,
        date: flight.date,
        plane: flight.plane.tailNum,
      };
      return formatted;
    });
};

const get = function findTicketById(ticketId) {
  return Ticket.findById(ticketId)
    .exec()
    .then(ticket => ticket.toObject())
    .then(populateFlight);
};

const findByUser = function findTicketsByUserId(userId) {
  return Ticket.find({ user: mongoose.Types.ObjectId(userId) })
    .exec()
    .then(tickets =>
      Promise.all(tickets.map(ticket => populateFlight(ticket.toObject()))));
};

const findByStatus = function findTicketsByStatus(status) {
  return Ticket.find({ status })
    .exec()
    .then(tickets =>
      Promise.all(tickets.map(ticket => populateFlight(ticket.toObject()))));
};

const findByFlight = function findTicketsByFlightId(flightId) {
  return Ticket.find({ flight: mongoose.Types.ObjectId(flightId) })
    .exec()
    .then(tickets =>
      Promise.all(tickets.map(ticket => populateFlight(ticket.toObject()))));
};

const findByPeriod = function findTicketsByPeriod(dateFrom, dateTo) {
  return Ticket.find({ createdAt: { $gte: dateFrom, $lte: dateTo } })
    .then(tickets =>
      Promise.all(tickets.map(ticket => populateFlight(ticket.toObject()))));
};

const getReservedSeats = function findReservedSeats(flightId) {
  return Ticket.find({
    flight: mongoose.Types.ObjectId(flightId),
    status: {
      $in: ['pending', 'confirmed'],
    },
  }, 'seat')
    .exec()
    .then(tickets => tickets.map(ticket => ticket.seat));
};

const add = function insertTicket(ticket) {
  return Ticket.create(ticket)
    .then(inserted => inserted.toObject());
};

const updateStatus = function updateTicket(ticketId, status) {
  return Ticket.findByIdAndUpdate(ticketId, { status }, { new: true })
    .exec()
    .then(updated => updated.toObject());
};

module.exports.get = get;
module.exports.findByUser = findByUser;
module.exports.findByStatus = findByStatus;
module.exports.findByFlight = findByFlight;
module.exports.findByPeriod = findByPeriod;
module.exports.getReservedSeats = getReservedSeats;
module.exports.add = add;
module.exports.updateStatus = updateStatus;
