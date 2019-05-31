const isDuplicateKeyError = require('./is-duplicate-key-error');
const isValidationError = require('./is-validation-error');

module.exports = (createError, e, statusCode = 422) => {
  if (isValidationError(e) || isDuplicateKeyError(e)) return createError(statusCode, e.message);
  return e;
};
