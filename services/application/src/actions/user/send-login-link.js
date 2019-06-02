const { createError } = require('micro');
const { createLoginToken } = require('@base-cms/id-me-utils');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { tokenService, mailerService } = require('@base-cms/id-me-service-clients');

const findByEmail = require('./find-by-email');

module.exports = async ({ url, applicationId, email } = {}) => {
  if (!url) throw createRequiredParamError('url');
  if (!applicationId) throw createRequiredParamError('applicationId');
  if (!email) throw createRequiredParamError('email');

  const user = await findByEmail({ applicationId, email, fields: ['id', 'email'] });

  if (!user) throw createError(404, `No user was found for '${email}'`);

  const { token } = await createLoginToken(tokenService, { email: user.email });

  const html = `
    <html>
      <body>
        <h1>Your personal login link.</h1>
        <p>The login link is good for one hour. If you did not request this link, simply ignore this email or contact support.</p>
        <p><a href="${url}/${token}">Login to Website</a></p>
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
