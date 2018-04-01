const Ticket = require('../models/Ticket');

const get = function findTicketById(ticketId) {
  return Ticket.findById(ticketId)
    .populate({
      path: 'flight',
      populate: {
        path: 'connection',
      },
    })
    .exec()
    .then(ticket => ticket.toObject());
};

const findByUser = function findTicketsByUserId(userId) {
  return Ticket.find({ user: userId })
    .populate({
      path: 'flight',
      populate: {
        path: 'connection',
      },
    })
    .exec();
};

const findByStatus = function findTicketsByStatus(status) {
  return Ticket.find({ status })
    .populate({
      path: 'flight',
      populate: {
        path: 'connection',
      },
    })
    .exec();
};

const findByFlight = function findTicketsByFlightId(flightId) {
  return Ticket.find({ flight: flightId })
    .populate({
      path: 'flight',
      populate: {
        path: 'connection',
      },
    })
    .exec();
};

const getReservedSeats = function findReservedSeats(flightId) {
  return Ticket.find({
    flight: flightId,
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
module.exports.getReservedSeats = getReservedSeats;
module.exports.add = add;
module.exports.updateStatus = updateStatus;
