const Application = require('../mongodb/models/application');

module.exports = async ({
  filter,
  update,
  options,
} = {}) => {
  await Application.updateMany(filter, update, options);
  return 'ok';
};
