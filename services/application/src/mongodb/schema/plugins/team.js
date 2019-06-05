const { Schema } = require('mongoose');

module.exports = function teamPlugin(schema) {
  schema.add({
    /**
     * @todo Must ensure that the team app id matches the parent app id.
     */
    teamIds: {
      type: [Schema.Types.ObjectId],
      index: true,
      default: () => [],
    },
  });
};
