const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaneSchema = new Schema({
  tailNum: {
    type: Schema.Types.String,
    required: true,
  },
  seats: {
    type: Schema.Types.Number,
    required: true,
  },
  scheme: [[{
    empty: Schema.Types.Boolean,
    seatNum: Schema.Types.Number,
  }]],
  __v: {
    type: Schema.Types.Number,
    select: false,
  },
});

module.exports = mongoose.model('Plane', PlaneSchema);
