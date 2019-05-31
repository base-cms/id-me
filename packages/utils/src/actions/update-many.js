module.exports = async (Model, {
  filter,
  update,
  options,
} = {}) => {
  await Model.updateMany(filter, update, options);
  return 'ok';
};
