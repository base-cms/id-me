const { Schema } = require('mongoose');

module.exports = function teamPlugin(schema) {
  schema.add({
    teamIds: {
      type: [Schema.Types.ObjectId],
      index: true,
      default: () => [],
    },
  });
};
