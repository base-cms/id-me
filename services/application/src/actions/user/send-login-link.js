const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { tokenService, mailerService, organizationService } = require('@identity-x/service-clients');
const { getAsObject } = require('@base-cms/object-path');
const { stripLines } = require('@identity-x/utils');
const { Application } = require('../../mongodb/models');
const { SENDING_DOMAIN } = require('../../env');
const findByEmail = require('./find-by-email');
const { isBurnerDomain } = require('../../utils/burner-email');

const createLoginToken = ({
  email,
  applicationId,
  ttl = 60 * 60,
} = {}) => tokenService.request('create', {
  payload: { aud: email },
  iss: applicationId,
  sub: 'app-user-login-link',
  ttl,
});

module.exports = async ({
  authUrl,
  redirectTo,
  applicationId,
  appContextId,
  email,
} = {}) => {
  if (!authUrl) throw createRequiredParamError('authUrl');
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!email) throw createRequiredParamError('email');

  const [app, user] = await Promise.all([
    Application.findById(applicationId, ['id', 'name', 'email', 'organizationId', 'contexts']),
    findByEmail({ applicationId, email, fields: ['id', 'email', 'domain'] }),
  ]);

  if (!app) throw createError(404, `No application was found for '${applicationId}'`);
  if (!user) throw createError(404, `No user was found for '${email}'`);

  // Ensure the email domain is valid (it's possible imported or old data may be invalid).
  if (isBurnerDomain(user.domain)) throw createError(422, `The email domain "${user.domain}" is not allowed. Please re-register with a valid email address.`);

  const org = await organizationService.request('findById', { id: app.organizationId, fields: ['company'] });
  if (!org) throw createError(404, `No organization was found for '${app.organizationId}'`);
  const company = getAsObject(org, 'company');

  // Load the active context
  const context = app.contexts.id(appContextId) || {};
  const appName = context.name || app.name;

  const addressFields = ['name', 'streetAddress', 'city', 'regionName', 'postalCode'];
  const addressValues = addressFields.map(field => company[field]).filter(v => v).map(stripLines);
  const supportEmail = context.email || app.email || company.supportEmail;
  if (supportEmail) addressValues.push(supportEmail);

  const { token } = await createLoginToken({ applicationId, email: user.email });
  let url = `${authUrl}?token=${token}`;
  if (redirectTo) url = `${url}&redirectTo=${encodeURIComponent(redirectTo)}`;

  const supportEmailHtml = supportEmail ? ` or <a href="mailto:${supportEmail}">contact our support staff</a>` : '';
  const supportEmailText = supportEmail ? ` or contact our support staff at ${supportEmail}` : '';

  const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" id="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=10.0,initial-scale=1.0">
        <title>Your personal login link</title>
      </head>
      <body>
        <p>You recently requested to login to <strong>${appName}</strong>. This link is good for one hour and will expire immediately after use.</p>
        <p><a href="${url}">Login to ${appName}</a></p>
        <p>If you didn't request this link, simply ignore this email${supportEmailHtml}.</p>
        <hr>
        <small style="font-color: #ccc;">
          <p>Please add <em>${SENDING_DOMAIN}</em> to your address book or safe sender list to ensure you receive future emails from us.</p>
          <p>You are receiving this email because a login request was made on ${appName}.</p>
          <p>For additional information please contact ${appName} c/o ${addressValues.join(', ')}.</p>
        </small>
      </body>
    </html>
  `;

  const text = `
You recently requested to login to ${appName}. This link is good for one hour and will expire immediately after use.

Login to ${appName} by visiting this link:
${url}

If you didn't request this link, simply ignore this email${supportEmailText}.

-------------------------

Please add ${SENDING_DOMAIN} to your address book or safe sender list to ensure you receive future emails from us.
You are receiving this email because a login request was made on ${appName}.
For additional information please contact ${appName} c/o ${addressValues.join(', ')}.
  `;

  await mailerService.request('send', {
    to: user.email,
    from: `${appName} <noreply@${SENDING_DOMAIN}>`,
    subject: 'Your personal login link',
    html,
    text,
  });
  return 'ok';
};
