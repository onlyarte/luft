const express = require('express');

const Flight = require('../controllers/Flight');
const Ticket = require('../controllers/Ticket');

const router = express.Router();

router.get('/', (req, res, next) => {
  Flight.getAll()
    .then((flights) => {
      res.send(flights);
    })
    .catch(next);
});

router.post('/new', (req, res, next) => {
  const {
    planeId,
    connectionId,
    date,
  } = req.body;
  Flight.add({
    plane: planeId,
    connection: connectionId,
    date: new Date(date),
  })
    .then((created) => {
      res.send(created);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Flight.get(req.params.id)
    .then((flight) => {
      res.send(flight);
    })
    .catch(next);
});

router.get('/find/:origin/:destination/:date', (req, res, next) => {
  Flight.find(
    req.params.origin,
    req.params.destination,
    new Date(decodeURI(req.params.date)),
  )
    .then((flights) => {
      res.send(flights);
    })
    .catch(next);
});

router.get('/:id/cancel', (req, res, next) => {
  Flight.cancel(req.params.id)
    .then((canceled) => {
      res.send(canceled);
    })
    .catch(next);
});

router.get('/:id/reserved', (req, res, next) => {
  Ticket.getReservedSeats()
    .then((seats) => {
      res.send(seats);
    })
    .catch(next);
});

module.exports = router;
