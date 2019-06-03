const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { tokenService, mailerService } = require('@base-cms/id-me-service-clients');

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
  applicationId,
  email,
  fields,
} = {}) => {
  if (!authUrl) throw createRequiredParamError('authUrl');
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!email) throw createRequiredParamError('email');

  const user = await findByEmail({ applicationId, email, fields: ['id', 'email'] });

  if (!user) throw createError(404, `No user was found for '${email}'`);

  const { token } = await createLoginToken({ applicationId, email: user.email, fields });

  const html = `
    <html>
      <body>
        <h1>Your personal login link.</h1>
        <p>The login link is good for one hour. If you did not request this link, simply ignore this email or contact support.</p>
        <p><a href="${authUrl}/${token}">Login to Website</a></p>
      </body>
    </html>
  `;
  await mailerService.request('send', {
    to: user.email,
    from: 'Website Name <noreply@base-cms.io>',
    subject: 'Your personal login link',
    html,
  });
  return 'ok';
};
