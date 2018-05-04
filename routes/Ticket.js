const express = require('express');

const Ticket = require('../controllers/Ticket');
const Price = require('../controllers/Price');

const router = express.Router();

router.post('/new', (req, res, next) => {
  const { userId, passanger, flightId, seat, priceId } = req.body;
  Price.get(priceId)
    .then((price) => {
      if (!price || price.flight !== flightId || price.seat !== seat) {
        throw new Error('Sorry, the offer has expired.');
      }
      return price;
    })
    .then(price => (
      Ticket.add({
        passanger,
        seat,
        user: userId,
        flight: flightId,
        price: price.amount,
      })
    ))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Ticket.get(req.params.id)
    .then((ticket) => {
      res.send(ticket);
    })
    .catch(next);
});

module.exports = router;
