/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { sync } = require('glob');
const { resolve } = require('path');

sync('./**/*.test.js').forEach(n => require(resolve(n)));
