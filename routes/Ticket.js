const express = require('express');

const Ticket = require('../controllers/Ticket');
const Price = require('../controllers/Price');

const router = express.Router();

router.post('/new', (req, res, next) => {
  const { passanger, flightId, seat, priceId } = req.body;
  console.log(JSON.stringify({ passanger, flightId, seat, priceId }));
  Price.get(priceId)
    .then((price) => {
      console.log(JSON.stringify(price));
      if (!price || price.flight != flightId) {
        throw new Error('Пропозиція вже не дійсна. Спробуйте зробити замовлення знову');
      }
      return price;
    })
    .then(price => (
      Ticket.add({
        passanger,
        seat,
        user: req.session.user,
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
