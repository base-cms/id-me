const {
  mailerService,
  organizationService,
  tokenService,
  userService,
} = require('@identity-x/service-clients');
const { createError } = require('micro');
const { createLoginToken } = require('@identity-x/utils');
const { createRequiredParamError } = require('@base-cms/micro').service;

const { OrgMembership, OrgInvitation } = require('../mongodb/models');
const { APPLICATION_URL, SENDING_DOMAIN } = require('../env');

module.exports = async ({
  organizationId,
  email,
  role,
  invitedByEmail,
} = {}) => {
  if (!organizationId) throw createRequiredParamError('organizationId');
  if (!email) throw createRequiredParamError('email');
  if (!invitedByEmail) throw createRequiredParamError('invitedByEmail');

  const [org, membership, user, invitedBy] = await Promise.all([
    organizationService.request('findById', { id: organizationId, fields: ['id', 'name'] }),
    OrgMembership.findFor(organizationId, email, ['id']),
    userService.request('create', { email, fields: ['id', 'email'] }),
    userService.request('findByEmail', { email: invitedByEmail, fields: ['id', 'email', 'givenName', 'familyName'] }),
  ]);

  if (!org) throw createError(404, `No organization was found for '${organizationId}'`);
  if (!invitedByEmail) throw createError(400, 'No user was found for invited by.');
  if (membership) throw createError(400, `This user is already a member of ${org.name}.`);

  await OrgInvitation.create({
    email: user.email,
    organizationId,
    role,
    invitedByEmail: invitedBy.email,
  });

  const ttl = 60 * 60 * 24 * 30;
  const { token } = await createLoginToken(tokenService, { email: user.email, ttl });

  const segments = encodeURIComponent(JSON.stringify([organizationId]));
  const url = `${APPLICATION_URL}/authenticate/${token}?route-name=manage.invites.view&route-segments=${segments}`;
  const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" id="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=10.0,initial-scale=1.0">
        <title>IdentityX Invitation</title>
      </head>
      <body>
        <h1>IdentityX</h1>
        <h2>${invitedBy.email} has invited you to join the ${org.name} organization.</h2>
        <hr>
        <p>You can accept or decline this invitation by visiting the link below. If you were not expecting this invitation, you can ignore this email.</p>
        <p><a href="${url}">View Invitation</a></p>
        <hr>
        <small>Link not working? You can copy and paste this link into your browser.<br>${url}</small>
      </body>
    </html>
  `;
  await mailerService.request('send', {
    to: user.email,
    from: `${invitedBy.givenName} ${invitedBy.familyName} <noreply@${SENDING_DOMAIN}>`,
    subject: `You've been invited to join ${org.name}`,
    html,
  });
  return 'ok';
};
