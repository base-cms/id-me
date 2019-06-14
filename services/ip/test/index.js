/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */
const { sync } = require('glob');
const { resolve } = require('path');

sync('./**/*.test.js').forEach(n => require(resolve(n)));
