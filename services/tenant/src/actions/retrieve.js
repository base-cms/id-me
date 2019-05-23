const { createError } = require('micro');

module.exports = async ({ key }) => {
  if (!key) createError(400, 'No tenant key was provided.');
  return { key };
};
