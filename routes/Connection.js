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
  const {
    originAirportId,
    destinationAirportId,
    departureTime,
    arrivalTime,
    distance,
  } = req.body;
  Connection.add({
    originAirportId,
    destinationAirportId,
    departureTime,
    arrivalTime,
    distance,
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
  const { closed } = req.body;
  Connection.update(req.params.id, {
    closed,
  })
    .then((updated) => {
      res.send(updated);
    })
    .catch(next);
});

router.delete('/:id/remove', (req, res, next) => {
  Connection.remove(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});

module.exports = router;
