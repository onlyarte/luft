const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaneSchema = new Schema({
  tailNum: {
    type: Schema.Types.Number,
    required: true,
  },
  schema: [Schema.Types.Mixed],
  __v: {
    type: Schema.Types.Number,
    select: false,
  },
});

module.exports = mongoose.model('Plane', PlaneSchema);
