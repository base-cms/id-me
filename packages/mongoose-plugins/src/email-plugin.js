const { normalizeEmail } = require('@base-cms/id-me-utils');
const emailValidator = require('./email-validator');

module.exports = function emailPlugin(schema, { name = 'email', options = {} } = {}) {
  schema.add({
    [name]: {
      ...options,
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      set: normalizeEmail,
      validate: emailValidator,
    },
  });

  schema.static('normalizeEmail', normalizeEmail);
};
