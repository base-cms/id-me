const { ping } = require('@identity-x/utils').mongoose;
const {
  mailerService,
  tokenService,
} = require('@identity-x/service-clients');
const connection = require('./mongodb/connection');
const pkg = require('../package.json');

module.exports = () => Promise.all([
  ping({ connection, pkg })(),
  mailerService.ping(),
  tokenService.ping(),
]);
