const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../controllers/User');

const router = express.Router();

router.post('/new', (req, res, next) => {
  const { firstname, surname, birth, email, password } = req.body;
  User.add({
    firstname,
    surname,
    birth,
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  })
    .then((created) => {
      res.send(created);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  User.get(req.params.id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
});

router.post('/:id/update', (req, res, next) => {
  const { firstname, surname, birth } = req.body;
  User.update(req.params.id, {
    firstname,
    surname,
    birth,
  })
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
