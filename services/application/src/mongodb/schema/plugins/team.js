const { Schema } = require('mongoose');

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = function teamPlugin(schema) {
  schema.add({
    teams: {
      type: [teamSchema],
      default: () => [],
    },
  });

  schema.index({ 'team._id': 1 });
};
