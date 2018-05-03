const mongoose = require('mongoose');

const { Schema } = mongoose;

const FlightSchema = new Schema({
  plane: {
    type: Schema.Types.ObjectId,
    ref: 'Plane',
    required: true,
  },
  connection: {
    type: Schema.Types.ObjectId,
    ref: 'Connection',
    required: true,
  },
  date: {
    type: Schema.Types.Date,
    required: true,
  },
  price: {
    type: Schema.Types.Number,
    required: true,
    default: 500,
  },
  coefficient: {
    type: Schema.Types.Number,
    required: true,
    default: 1,
  },
  __v: {
    type: Schema.Types.Number,
    select: false,
  },
});

module.exports = mongoose.model('Flight', FlightSchema);
