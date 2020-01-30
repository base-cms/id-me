const { mailerService } = require('@base-cms/id-me-service-clients');

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
    <p>If you didn't request this export, simply ignore this email or <a href="mailto:base@endeavorb2b.com">contact our support staff</a>.</p>
    <hr>
    <small style="font-color: #ccc;">
      <p>Please add <em>identity-x.base-cms.io</em> to your address book or safe sender list to ensure you receive future emails from us.</p>
      <p>You are receiving this email because an export request was made within IdentityX.</p>
      <p>For additional information please contact IdentityX c/o Endeavor Business Media, 1233 Janesville Ave, Fort Atkinson, WI 53551, base@endeavorb2b.com, 800-547-7377.</p>
    </small>
  </body>
</html>
`;

const text = url => `
Your export is available.
-------------------------

You recently requested an export of IdentityX data. Your export can be accessed by visiting the following URL:
${url}

If you didn't request this export, simply ignore this email or contact our support staff at base@endeavorb2b.com.

-------------------------

Please add identity-x.base-cms.io to your address book or safe sender list to ensure you receive future emails from us.
You are receiving this email because a login request was made on IdentityX.
For additional information please contact IdentityX c/o Endeavor Business Media, 1233 Janesville Ave, Fort Atkinson, WI 53551, base@endeavorb2b.com, 800-547-7377.
  `;

module.exports = ({ url, email }) => mailerService.request('send', {
  to: email,
  from: 'IdentityX <noreply@identity-x.base-cms.io>',
  subject: 'Your export is available',
  html: html(url),
  text: text(url),
});
