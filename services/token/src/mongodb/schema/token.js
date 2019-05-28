const { Schema } = require('mongoose');

const schema = new Schema({
  _id: {
    type: String,
  },
  sub: {
    type: String,
    required: true,
    index: true,
  },
  payload: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

module.exports = schema;
