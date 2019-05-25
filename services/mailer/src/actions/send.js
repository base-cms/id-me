const sgMail = require('@sendgrid/mail');
const { service } = require('@base-cms/micro');
const { SENDGRID_API_KEY } = require('../env');

const { createRequiredParamError } = service;

module.exports = async ({
  to,
  from,
  subject,
  html,
}) => {
  if (!to) throw createRequiredParamError('to');
  if (!from) throw createRequiredParamError('from');
  if (!subject) throw createRequiredParamError('subject');
  if (!html) throw createRequiredParamError('html');

  sgMail.setApiKey(SENDGRID_API_KEY);
  return sgMail.send({
    to,
    from,
    subject,
    html,
  });
};
