const { Schema } = require('mongoose');

module.exports = function accessLevelPlugin(schema) {
  schema.add({
    accessLevelIds: {
      type: [Schema.Types.ObjectId],
      index: true,
      default: () => [],
    },
  });
};
