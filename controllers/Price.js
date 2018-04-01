const Price = require('../models/Price');

const get = function findPriceById(priceId) {
  return Price.findById(priceId)
    .exec()
    .then(price => price.toObject());
};

const add = function insertPlane(price) {
  return Price.create(price)
    .then(inserted => inserted.toObject());
};

module.exports.get = get;
module.exports.add = add;
