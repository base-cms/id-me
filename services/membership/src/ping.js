const { ping } = require('@identity-x/utils').mongoose;
const {
  mailerService,
  organizationService,
  tokenService,
  userService,
} = require('@identity-x/service-clients');
const connection = require('./mongodb/connection');
const pkg = require('../package.json');

module.exports = () => Promise.all([
  ping({ connection, pkg })(),
  mailerService.ping(),
  organizationService.ping(),
  tokenService.ping(),
  userService.ping(),
]);
