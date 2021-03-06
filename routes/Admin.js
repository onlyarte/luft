const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../controllers/User');

const router = express.Router();

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

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
  /* Set session variable & send user details */
    .then((user) => {
      if (user.isSuper) {
        req.session.admin = user._id;
        res.send(user);
      } else {
        throw new Error('Доступ заборонено!');
      }
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
  const { firstname, surname, birth, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(encryptedPassword => (
      User.add({
        firstname,
        surname,
        birth,
        email,
        password: encryptedPassword,
        isSuper: true,
      })
    ))
    .then((created) => {
      req.session.user = created._id;
      res.send(created);
    })
    .catch(next);
});

router.get('/current', (req, res, next) => {
  User.get(req.session.admin)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
});

router.post('/current/update', (req, res, next) => {
  const { email, firstname, surname } = req.body;
  User.update(req.session.admin, {
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
      User.update(req.session.admin, {
        password: encryptedPassword,
      })
    ))
    .then((updated) => {
      res.send(updated);
    })
    .catch(next);
});

router.delete('/:id/remove', (req, res, next) => {
  User.remove(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});

module.exports = router;
