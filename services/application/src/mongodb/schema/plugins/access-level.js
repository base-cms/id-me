const { Schema } = require('mongoose');

const accessLevelSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = function accessLevelPlugin(schema) {
  schema.add({
    accessLevels: {
      type: [accessLevelSchema],
      default: () => [],
    },
  });

  schema.index({ 'accessLevel._id': 1 });
};
