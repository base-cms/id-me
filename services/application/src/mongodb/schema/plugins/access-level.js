const { Schema } = require('mongoose');

module.exports = function accessLevelPlugin(schema) {
  schema.add({
    /**
     * @todo Must ensure that the access level app id matches the parent app id.
     */
    accessLevelIds: {
      type: [Schema.Types.ObjectId],
      index: true,
      default: () => [],
    },
  });
};
