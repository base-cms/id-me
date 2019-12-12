const country = require('./country');
const region = require('./region');

const { keys } = Object;

const load = (root, obj) => keys(obj).reduce((o, key) => {
  const k = `${root}.${key}`;
  return { ...o, [k]: obj[key] };
}, {});


module.exports = {
  ...load('country', country),
  ...load('region', region),
};
