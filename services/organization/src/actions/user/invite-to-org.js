const { createError } = require('micro');
const Organization = require('../organization');
const createUser = require('./create');
const validateParams = require('../validate-required-params');
const { OrgMembership, OrgInvitation } = require('../../mongodb/models');


module.exports = async ({
  organizationId,
  email,
  role,
} = {}) => {
  validateParams({
    organizationId,
    email,
  });

  const [org, membership] = await Promise.all([
    Organization.findById({ id: organizationId, fields: ['id', 'name'] }),
    OrgMembership.findOne({ email, organizationId }, { _id: 1 }),
    createUser({ email, fields: ['id'] }),
  ]);
  if (!org) throw createError(404, `No organization was found for '${organizationId}'`);
  if (membership) throw createError(400, `This user is already a member of ${org.name}.`);

  const invite = new OrgInvitation({ email, organizationId, role });
  await invite.validate();
  const $set = invite.toObject();
  delete $set._id;

  await OrgInvitation.update({ email, organizationId }, { $set }, { upsert: true });
  return 'ok';
};
