const { Schema } = require('mongoose');
const connection = require('../../connection');

module.exports = function organizationPlugin(schema) {
  schema.add({
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'organization',
      required: true,
      validate: {
        async validator(id) {
          const doc = await connection.model('organization').findById(id, { _id: 1 });
          if (doc) return true;
          return false;
        },
        message: 'No organization found for ID {VALUE}',
      },
    },
  });
};
