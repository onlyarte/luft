const express = require('express');

const Price = require('../controllers/Price');

const router = express.Router();

router.post('/new', (req, res, next) => {
  const { userId, flightId, seat } = req.body;
  Price.add({
    seat,
    user: userId,
    flight: flightId,
    amount: 100,
  })
    .then((price) => {
      res.send(price);
    })
    .catch(next);
});

module.exports = router;
