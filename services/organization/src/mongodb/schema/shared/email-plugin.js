const emailValidator = require('./email-validator');

module.exports = function emailPlugin(schema, options = {}) {
  schema.add({
    email: {
      ...options,
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: emailValidator,
    },
  });
};
