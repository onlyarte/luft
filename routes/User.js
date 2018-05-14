const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../controllers/User');
const Ticket = require('../controllers/Ticket');

const router = express.Router();

router.get('/current', (req, res, next) => {
  User.get(req.session.user)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  console.log(email + password);

  /* Compare passwords */
  User.getPassword(email)
    .then(encryptedPassword => (
      bcrypt.compare(password, encryptedPassword)
        .then((isMatching) => {
          if (!isMatching) {
            throw new Error('Неправильна адреса скриньки або пароль');
          }
        })
    ))
  /* Request user details */
    .then(() => (
      User.getByEmail(email)
    ))
  /* Set sesstion variable & send user details */
    .then((user) => {
      req.session.user = user._id;
      res.send(user);
    })
    .catch(next);
});

router.delete('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (!err) {
      res.sendStatus(200);
      return;
    }
    next(new Error('Session could not be destroyed'));
  });
});

router.post('/new', (req, res, next) => {
  const { firstname, surname, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(encryptedPassword => (
      User.add({
        firstname,
        surname,
        email,
        password: encryptedPassword,
      })
    ))
    .then((created) => {
      req.session.user = created._id;
      res.send(created);
    })
    .catch(next);
});

router.get('/tickets', (req, res, next) => {
  Ticket.findByUser(req.session.user)
    .then((tickets) => {
      res.send(tickets);
    })
    .catch(next);
});

router.post('/current/update', (req, res, next) => {
  const { email, firstname, surname } = req.body;
  User.update(req.session.user, {
    email,
    firstname,
    surname,
  })
    .then((updated) => {
      res.send(updated);
    })
    .catch(next);
});

router.post('/current/password/update', (req, res, next) => {
  const { password } = req.body;
  bcrypt.hash(password, 10)
    .then(encryptedPassword => (
      User.update(req.session.user, {
        password: encryptedPassword,
      })
    ))
    .then((updated) => {
      res.send(updated);
    })
    .catch(next);
});

router.delete('/current/remove', (req, res, next) => {
  User.remove(req.session.user)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});

module.exports = router;
