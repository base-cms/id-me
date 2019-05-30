const mailerService = require('@base-cms/id-me-mailer-client');
const orgService = require('@base-cms/id-me-organization-client');
const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const createUser = require('./create');
const { OrgMembership, OrgInvitation } = require('../mongodb/models');
const createLoginToken = require('../utils/create-login-token');


module.exports = async ({
  organizationId,
  email,
  role,
} = {}) => {
  if (!organizationId) throw createRequiredParamError('organizationId');
  if (!email) throw createRequiredParamError('email');

  const [org, membership, user] = await Promise.all([
    orgService.request('findById', { id: organizationId, fields: ['id', 'name'] }),
    OrgMembership.findFor(organizationId, email, { _id: 1 }),
    createUser({ email, fields: ['id', 'email'] }),
  ]);
  if (!org) throw createError(404, `No organization was found for '${organizationId}'`);
  if (membership) throw createError(400, `This user is already a member of ${org.name}.`);

  const invite = new OrgInvitation({ email, organizationId, role });
  await invite.validate();
  const $set = invite.toObject();
  delete $set._id;

  const { token } = await createLoginToken(user.email, 60 * 60 * 24 * 30);

  await OrgInvitation.update({ email: user.email, organizationId }, { $set }, { upsert: true });

  const html = `
    <html>
      <body>
        <h1>You've been invited to join an organization on ID|Me.</h1>
        <h2>${org.name}</h2>
        <p><a href="http://www.google.com/join/${token}">Login to join the ${org.name} organization.</a></p>
      </body>
    </html>
  `;
  await mailerService.request('send', {
    to: user.email,
    from: 'ID|Me Platform <noreply@base-cms.io>',
    subject: `You've been invited to join ${org.name}`,
    html,
  });
  return 'ok';
};
