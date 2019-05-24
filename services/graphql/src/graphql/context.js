const { UserInputError } = require('apollo-server-express');
const Organization = require('../mongodb/models/organization');

module.exports = async ({ req }) => {
  const organizationId = req.get('x-organization-id');
  if (!organizationId) throw new UserInputError("The required 'x-organization-id' header was not provided.");
  const organization = await Organization.findByIdActive(organizationId);
  if (!organization) throw new UserInputError(`No organization was found for '${organizationId}'`);
  return { organization };
};
