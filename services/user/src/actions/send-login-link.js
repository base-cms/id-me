const { createError } = require('micro');
const { createLoginToken } = require('@base-cms/id-me-utils');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { tokenService, mailerService } = require('@base-cms/id-me-service-clients');

const findByEmail = require('./find-by-email');
const { APPLICATION_URL } = require('../env');

module.exports = async ({ email } = {}) => {
  if (!email) throw createRequiredParamError('email');

  const user = await findByEmail({ email, fields: ['id', 'email'] });

  if (!user) throw createError(404, `No user was found for '${email}'`);

  const { token } = await createLoginToken(tokenService, { email: user.email });

  const url = `${APPLICATION_URL}/authenticate/${token}?route=manage.index`;
  const html = `
    <html>
      <body>
        <h1>Your personal login link.</h1>
        <p>The login link is good for one hour. If you did not request this link, simply ignore this email or contact support.</p>
<<<<<<< HEAD
        <p><a href="http://www.google.com/login/${token}">Login to IdentityX</a></p>
=======
        <p><a href="${url}">Login to ID|Me</a></p>
>>>>>>> Update app url
      </body>
    </html>
  `;
  await mailerService.request('send', {
    to: user.email,
    from: 'IdentityX <noreply@identity-x.base-cms.io>',
    subject: 'Your personal login link',
    html,
  });
  return 'ok';
};
