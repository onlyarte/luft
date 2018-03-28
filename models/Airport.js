const mongoose = require('mongoose');

const { Schema } = mongoose;

const AirportSchema = new Schema({
  code: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  city: {
    type: Schema.Types.String,
    required: true,
  },
  country: {
    type: Schema.Types.String,
    required: true,
  },
  __v: {
    type: Schema.Types.Number,
    select: false,
  },
});

module.exports = mongoose.model('Airport', AirportSchema);
