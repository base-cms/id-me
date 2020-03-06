const { Schema } = require('mongoose');
const { applicationPlugin } = require('@identity-x/mongoose-plugins');

const schema = new Schema({
  /**
   * @todo Must ensure that the related stream's app id matches this app id
   */
  streamId: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  /**
   * @todo Must ensure that the related user's app id matches this app id
   */
  appUserId: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  banned: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  ipAddress: {
    type: String,
  },
}, { timestamps: true });

schema.plugin(applicationPlugin);

module.exports = schema;
