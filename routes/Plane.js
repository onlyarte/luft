const express = require('express');

const Plane = require('../controllers/Plane');

const router = express.Router();

router.post('/new', (req, res, next) => {
  const { tailNum, seats, scheme } = req.body;
  Plane.add({ tailNum, seats, scheme })
    .then((plane) => {
      res.send(plane);
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  Plane.getAll()
    .then((connections) => {
      res.send(connections);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Plane.get(req.params.id)
    .then((plane) => {
      res.send(plane);
    })
    .catch(next);
});

router.post('/:id/update', (req, res, next) => {
  const { tailNum, seats, scheme } = req.body;
  Plane.update(req.params.id, { tailNum, seats, scheme })
    .then((updated) => {
      res.send(updated);
    })
    .catch(next);
});

router.delete('/:id/remove', (req, res, next) => {
  Plane.remove(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});

module.exports = router;
