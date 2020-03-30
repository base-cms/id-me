const { normalizeEmail } = require('@identity-x/utils');
const emailValidator = require('./email-validator');

module.exports = function emailPlugin(schema, { name = 'email', options = {} } = {}) {
  schema.add({
    [name]: {
      required: true,
      ...options,
      type: String,
      trim: true,
      lowercase: true,
      set: normalizeEmail,
      validate: emailValidator,
    },
  });

  schema.static('normalizeEmail', normalizeEmail);
};
