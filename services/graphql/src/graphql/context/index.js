const createOrg = require('./organization');

module.exports = async ({ req }) => {
  const organizationId = req.get('x-organization-id');
  const org = await createOrg(organizationId);
  return { org };
};
