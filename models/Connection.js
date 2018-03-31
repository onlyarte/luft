const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConnectionSchema = new Schema({
  originAirportId: {
    type: Schema.Types.ObjectId,
    ref: 'Airport',
    required: true,
  },
  destinationAirportId: {
    type: Schema.Types.ObjectId,
    ref: 'Airport',
    required: true,
  },
  departureTime: {
    type: Schema.Types.String,
    required: true,
    validate: {
      validator: () => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]/.test(this.departure_time),
      message: 'Departure time is wrong!',
    },
  },
  arrivalTime: {
    type: Schema.Types.String,
    required: true,
    validate: {
      validator: () => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]/.test(this.arrival_time),
      message: 'Arrival time is wrong',
    },
  },
  distance: {
    type: Schema.Types.Number,
    required: true,
  },
  dateFrom: {
    type: Schema.Types.Date,
  },
  dateTo: {
    type: Schema.Types.Date,
  },
  period: [{
    type: Schema.Types.String,
    enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    required: true,
  }],
  available: [{
    type: Schema.Types.Number,
    required: true,
  }],
  __v: {
    type: Schema.Types.Number,
    select: false,
  },
});

module.exports = mongoose.model('Connection', ConnectionSchema);
