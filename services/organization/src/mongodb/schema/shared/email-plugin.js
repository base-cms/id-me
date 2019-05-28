const { normalizeEmail } = require('@base-cms/id-me-utils');
const emailValidator = require('./email-validator');

module.exports = function emailPlugin(schema, { connection, fieldOptions = {} } = {}) {
  schema.add({
    email: {
      ...fieldOptions,
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: emailValidator,
    },
  });

  schema.static('normalizeEmail', normalizeEmail);

  schema.static('findByEmail', async function findByEmail(value, fields) {
    const email = connection.model('user').normalizeEmail(value);
    if (!email) throw new Error('Unable to find user: no email address was provided.');
    return this.findOne({ email }, fields);
  });
};
