const express = require('express');
const cloudinary = require('cloudinary');

const Post = require('../controllers/Post');

const router = express.Router();

router.get('/', (req, res, next) => {
  Post.getAll()
    .then((posts) => {
      res.send(posts);
    })
    .catch(next);
});

router.post('/new', (req, res, next) => {
  const { img, title, text } = req.body;
  Post.add({
    img,
    title,
    text,
  })
    .then((created) => {
      res.send(created);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Post.get(req.params.id)
    .then((post) => {
      res.send(post);
    })
    .catch(next);
});

router.post('/:id/update', (req, res, next) => {
  const { img, title, text } = req.body;
  Post.update(req.params.id, { img, title, text })
    .then((updated) => {
      res.send(updated);
    })
    .catch(next);
});

router.delete('/:id/remove', (req, res, next) => {
  Post.remove(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});

router.post('/image/upload', (req, res, next) => {
  const { img } = req.files;
  const path = `./public/images/${Date.now()}-${img.name}`;
  img.mv(path, (error) => {
    if (error) {
      next(error);
      return;
    }
    cloudinary.v2.uploader.upload(path, (err, result) => {
      if (err) {
        next(err);
        return;
      }
      res.send(result.url);
    });
  });
});

module.exports = router;
