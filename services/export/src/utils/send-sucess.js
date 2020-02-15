const { mailerService } = require('@identity-x/service-clients');
const { SENDING_DOMAIN, SUPPORT_EMAIL, SUPPORT_ENTITY } = require('../env');

const html = url => `
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" id="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=10.0,initial-scale=1.0">
    <title>Your export is available</title>
  </head>
  <body>
    <h1>Your export is available.</h1>
    <p>You recently requested an export of IdentityX data. Your report can be accessed by visiting the following URL.</p>
    <p><a href="${url}">Download report</a></p>
    <p>If you didn't request this export, simply ignore this email or <a href="mailto:${SUPPORT_EMAIL}">contact our support staff</a>.</p>
    <hr>
    <small style="font-color: #ccc;">
      <p>Please add <em>${SENDING_DOMAIN}</em> to your address book or safe sender list to ensure you receive future emails from us.</p>
      <p>You are receiving this email because an export request was made within IdentityX.</p>
      <p>For additional information please contact IdentityX c/o ${SUPPORT_ENTITY}, ${SUPPORT_EMAIL}.</p>
    </small>
  </body>
</html>
`;

const text = url => `
Your export is available.
-------------------------

You recently requested an export of IdentityX data. Your export can be accessed by visiting the following URL:
${url}

If you didn't request this export, simply ignore this email or contact our support staff at ${SUPPORT_EMAIL}.

-------------------------

Please add ${SENDING_DOMAIN} to your address book or safe sender list to ensure you receive future emails from us.
You are receiving this email because a login request was made on IdentityX.
For additional information please contact IdentityX c/o ${SUPPORT_ENTITY}, ${SUPPORT_EMAIL}.
  `;

module.exports = ({ url, email }) => mailerService.request('send', {
  to: email,
  from: `IdentityX <noreply@${SENDING_DOMAIN}>`,
  subject: 'Your export is available',
  html: html(url),
  text: text(url),
});
