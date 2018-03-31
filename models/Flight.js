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
  status: {
    type: Schema.Types.String,
    enum: [],
    default: 'active',
    required: true,
  },
  __v: {
    type: Schema.Types.Number,
    select: false,
  },
});

module.exports = mongoose.model('Flight', FlightSchema);