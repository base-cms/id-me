const user = require('./user');

const { keys } = Object;

const load = (root, obj) => keys(obj).reduce((o, key) => {
  const k = `${root}.${key}`;
  return { ...o, [k]: obj[key] };
}, {});

module.exports = {
  ...load('user', user),
};
