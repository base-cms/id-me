const { mailerService } = require('@identity-x/service-clients');
const { SENDING_DOMAIN, SUPPORT_EMAIL, SUPPORT_ENTITY } = require('../env');

const html = error => `
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" id="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=10.0,initial-scale=1.0">
    <title>Your export was unsuccessful</title>
  </head>
  <body>
    <h1>Your export was unsuccessful.</h1>
    <p>You recently requested an export of IdentityX data, however this export could not be processed in a timely manner.</p>
    <p>If you didn't request this export, simply ignore this email or <a href="mailto:${SUPPORT_EMAIL}">contact our support staff</a>.</p>
    <p>The following error was encountered while processing this export: <code>${error.message}</code>.</p>
    <hr>
    <small style="font-color: #ccc;">
      <p>Please add <em>${SENDING_DOMAIN}</em> to your address book or safe sender list to ensure you receive future emails from us.</p>
      <p>You are receiving this email because an export request was made within IdentityX.</p>
      <p>For additional information please contact IdentityX c/o ${SUPPORT_ENTITY}, ${SUPPORT_EMAIL}.</p>
    </small>
  </body>
</html>
`;

const text = error => `
Your export was unsuccessful.
-------------------------

You recently requested an export of IdentityX data, however this export could not be processed in a timely manner.

If you didn't request this export, simply ignore this email or contact our support staff at ${SUPPORT_EMAIL}.

The following error was encountered while processing this export: ${error.message}.

-------------------------

Please add ${SENDING_DOMAIN} to your address book or safe sender list to ensure you receive future emails from us.
You are receiving this email because a login request was made on IdentityX.
For additional information please contact IdentityX c/o ${SUPPORT_ENTITY}, ${SUPPORT_EMAIL}.
  `;

module.exports = ({ error, email }) => mailerService.request('send', {
  to: email,
  from: `IdentityX <noreply@${SENDING_DOMAIN}>`,
  subject: 'Your export was unsuccessful',
  html: html(error),
  text: text(error),
});
