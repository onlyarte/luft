const express = require('express');

const Connection = require('../controllers/Connection');

const router = express.Router();

router.get('/', (req, res, next) => {
  Connection.getAll()
    .then((connections) => {
      res.send(connections);
    })
    .catch(next);
});

router.post('/new', (req, res, next) => {
  if (!req.session.admin) {
    next(new Error('Access denied!'));
    return;
  }

  const {
    originAirport,
    destinationAirport,
    departureTime,
    arrivalTime,
  } = req.body;

  Connection.add({
    originAirport,
    destinationAirport,
    departureTime,
    arrivalTime,
  })
    .then((created) => {
      res.send(created);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Connection.get(req.params.id)
    .then((connection) => {
      res.send(connection);
    })
    .catch(next);
});

router.post('/:id/update', (req, res, next) => {
  if (!req.session.admin) {
    next(new Error('Access denied!'));
    return;
  }

  const { departureTime, arrivalTime } = req.body;

  Connection.update(req.params.id, { departureTime, arrivalTime })
    .then((updated) => {
      res.send(updated);
    })
    .catch(next);
});

router.delete('/:id/remove', (req, res, next) => {
  if (!req.session.admin) {
    next(new Error('Access denied!'));
    return;
  }

  Connection.remove(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});

module.exports = router;
