const { Schema } = require('mongoose');
const { applicationPlugin } = require('@identity-x/mongoose-plugins');
const { isURL } = require('validator');

const schema = new Schema({
  identifier: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  urls: {
    type: [String],
    validate: {
      validator(urls) {
        return urls.every(url => isURL(url, { require_protocol: true, required_host: true }));
      },
      message: props => `The URL "${props.value}" is invalid.`,
    },
  },
  archived: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

schema.plugin(applicationPlugin, { collateWhen: ['title', 'identifier'] });

schema.index({ applicationId: 1, identifier: 1 }, { unique: true });
schema.index({ title: 1, _id: 1 }, { collation: { locale: 'en_US' } });
schema.index({ identifier: 1, _id: 1 }, { collation: { locale: 'en_US' } });

module.exports = schema;
