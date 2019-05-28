const isDuplicateKeyError = require('./is-duplicate-key-error');
const isValidationError = require('./is-validation-error');

module.exports = (micro, e, statusCode = 422) => {
  const { createError } = micro;
  if (isValidationError(e) || isDuplicateKeyError(e)) return createError(statusCode, e.message);
  return e;
};
