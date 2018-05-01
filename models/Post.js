const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  img: {
    type: Schema.Types.String,
    required: true,
  },
  title: {
    type: Schema.Types.String,
    required: true,
  },
  text: {
    type: Schema.Types.String,
    required: true,
  },
  __v: {
    type: Schema.Types.Number,
    select: false,
  },
});

module.exports = mongoose.model('Post', PostSchema);
