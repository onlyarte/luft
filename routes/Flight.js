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
  if (!req.session.admin) {
    next(new Error('Access denied!'));
    return;
  }

  const {
    plane,
    connection,
    date,
    price,
  } = req.body;

  Flight.add({
    plane,
    connection,
    date: new Date(date),
    price,
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
    new Date(Number(req.params.date)),
  )
    .then((flights) => {
      res.send(flights);
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

router.post('/:id/update', (req, res, next) => {
  if (!req.session.admin) {
    next(new Error('Access denied!'));
    return;
  }

  const { coefficient } = req.body;
  Flight.update(req.params.id, { coefficient })
    .then((updated) => {
      res.send(updated);
    })
    .catch(next);
});

module.exports = router;
