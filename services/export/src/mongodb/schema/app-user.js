const { Schema } = require('mongoose');

const schema = new Schema({
  email: String,
  domain: String,
  verified: Boolean,
  lastLoggedIn: Date,
  givenName: String,
  familyName: String,
  organization: String,
  organizationTitle: String,
  countryCode: String,
  countryName: String,
  applicationId: Schema.Types.ObjectId,
  accessLevelIds: {
    type: [Schema.Types.ObjectId],
    default: () => [],
  },
  teamIds: {
    type: [Schema.Types.ObjectId],
    default: () => [],
  },
}, { timestamps: true });

module.exports = schema;
