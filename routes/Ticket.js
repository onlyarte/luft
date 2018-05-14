const express = require('express');

const Ticket = require('../controllers/Ticket');
const Price = require('../controllers/Price');

const router = express.Router();

router.post('/new', (req, res, next) => {
  const { passanger, flightId, seat, priceId } = req.body;
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
    .then((ticket) => {
      res.send(ticket);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Ticket.get(req.params.id)
    .then((ticket) => {
      res.send(ticket);
    })
    .catch(next);
});

router.get('/period/:from/:to', (req, res, next) => {
  if (!req.session.admin) {
    next(new Error('Access denied!'));
    return;
  }

  Ticket.findByPeriod(
    new Date(req.params.from),
    new Date(req.params.to),
  )
    .then((tickets) => {
      res.send(tickets);
    })
    .catch(next);
});

router.get('/flight/:id', (req, res, next) => {
  if (!req.session.admin) {
    next(new Error('Access denied!'));
    return;
  }

  Ticket.findByFlight(req.params.id)
    .then((tickets) => {
      res.send(tickets);
    })
    .catch(next);
});

module.exports = router;
