const { Schema } = require('mongoose');
const { applicationPlugin } = require('@identity-x/mongoose-plugins');
const { Application } = require('../models');

const schema = new Schema({
  identifier: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

schema.plugin(applicationPlugin, {
  options: {
    validate: {
      async validator(applicationId) {
        const app = await Application.findById(applicationId, ['id']);
        return Boolean(app);
      },
      message: props => `No application was found for ${props.value}`,
    },
  },
  collateWhen: ['title', 'identifier'],
});

schema.index({ applicationId: 1, identifier: 1 }, { unique: true });
schema.index({ title: 1, _id: 1 }, { collation: { locale: 'en_US' } });
schema.index({ identifier: 1, _id: 1 }, { collation: { locale: 'en_US' } });

module.exports = schema;
