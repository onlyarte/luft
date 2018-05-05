const mongoose = require('mongoose');

const { Schema } = mongoose;

const TicketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  passanger: {
    firstname: {
      type: Schema.Types.String,
      required: true,
    },
    surname: {
      type: Schema.Types.String,
      required: true,
    },
  },
  flight: {
    type: Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
  seat: {
    type: Schema.Types.Number,
    required: true,
  },
  price: {
    type: Schema.Types.Number,
    required: true,
  },
  status: {
    type: Schema.Types.String,
    required: true,
    enum: ['pending', 'confirmed', 'cancelled', 'returned', 'refunded'],
    default: 'confirmed',
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
    required: true,
  },
  __v: {
    type: Schema.Types.Number,
    select: false,
  },
});

module.exports = mongoose.model('Ticket', TicketSchema);
