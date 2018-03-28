const express = require('express');

const Airport = require('../controllers/Airport');

const router = express.Router();

router.get('/', (req, res, next) => {
  Airport.getAll()
    .then((airports) => {
      res.send(airports);
    })
    .catch(next);
});

router.post('/new', (req, res, next) => {
  const { code, name, country, city } = req.body;
  Airport.add({
    code,
    name,
    city,
    country,
  })
    .then((created) => {
      res.send(created);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Airport.get(req.params.id)
    .then((airport) => {
      res.send(airport);
    })
    .catch(next);
});

router.post('/:id/update', (req, res, next) => {
  const { name } = req.body;
  Airport.update(req.params.id, { name })
    .then((updated) => {
      res.send(updated);
    })
    .catch(next);
});

router.delete('/:id/remove', (req, res, next) => {
  Airport.remove(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});

module.exports = router;
