const escapeRegex = require('escape-string-regexp');

module.exports = (term, position) => {
  let start = '';
  let end = '';
  if (position === 'starts') {
    start = '^';
  } else if (position === 'ends') {
    end = '$';
  } else if (position === 'exact') {
    start = '^';
    end = '$';
  }
  const value = escapeRegex(term);
  return new RegExp(`${start}${value.replace(/\s\s+/, ' ').replace(' ', '|')}${end}`, 'i');
};
