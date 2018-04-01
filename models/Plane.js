const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaneSchema = new Schema({
  tailNum: {
    type: Schema.Types.String,
    required: true,
  },
  scheme: {
    rowsNum: Schema.Types.Number,
    colsNum: Schema.Types.Number,
    seatsNum: Schema.Types.Number,
    rows: [{
      _id: false,
      rowID: Schema.Types.Number,
      cols: [{
        _id: false,
        colID: Schema.Types.Number,
        seat: Schema.Types.Number,
      }],
    }],
  },
  __v: {
    type: Schema.Types.Number,
    select: false,
  },
});

module.exports = mongoose.model('Plane', PlaneSchema);
