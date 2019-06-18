const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { tokenService, mailerService } = require('@base-cms/id-me-service-clients');
const { Application } = require('../../mongodb/models');

const findByEmail = require('./find-by-email');

const createLoginToken = ({
  email,
  applicationId,
  fields,
  ttl = 60 * 60,
} = {}) => tokenService.request('create', {
  payload: { aud: email, fields },
  iss: applicationId,
  sub: 'app-user-login-link',
  ttl,
});


module.exports = async ({
  authUrl,
  redirectTo,
  applicationId,
  email,
  fields,
} = {}) => {
  if (!authUrl) throw createRequiredParamError('authUrl');
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!email) throw createRequiredParamError('email');

  const [app, user] = await Promise.all([
    Application.findById(applicationId, ['id', 'name']),
    findByEmail({ applicationId, email, fields: ['id', 'email'] }),
  ]);

  if (!app) throw createError(404, `No application was found for '${applicationId}'`);
  if (!user) throw createError(404, `No user was found for '${email}'`);

  const { token } = await createLoginToken({ applicationId, email: user.email, fields });
  let url = `${authUrl}?token=${token}`;
  if (redirectTo) url = `${url}&redirectTo=${encodeURIComponent(redirectTo)}`;
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
        <h1>Your personal login link.</h1>
        <p>You recently requested to login to <strong>${app.name}</strong>. This link is good for one hour and will expire immediately after use.</p>
        <p><a href="${url}">Login to ${app.name}</a></p>
        <p>If you didn't request this link, simply ignore this email or <a href="mailto:base@endeavorb2b.com">contact our support staff</a>.</p>
        <hr>
        <small style="font-color: #ccc;">
          <p>Please add <em>identity-x.base-cms.io</em> to your address book or safe sender list to ensure you receive future emails from us.</p>
          <p>You are receiving this email because a login request was made on ${app.name}.</p>
          <p>For additional information please contact ${app.name} c/o Endeavor Business Media, 1233 Janesville Ave, Fort Atkinson, WI 53551, base@endeavorb2b.com, 800-547-7377.</p>
        </small>
      </body>
    </html>
  `;
  await mailerService.request('send', {
    to: user.email,
    from: `${app.name} <noreply@identity-x.base-cms.io>`,
    subject: 'Your personal login link',
    html,
  });
  return 'ok';
};
