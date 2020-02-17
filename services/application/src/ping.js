const { ping } = require('@identity-x/utils').mongoose;
const {
  ipService,
  localeService,
  tokenService,
  organizationService,
} = require('@identity-x/service-clients');
const connection = require('./mongodb/connection');
const pkg = require('../package.json');

module.exports = () => Promise.all([
  ping({ connection, pkg })(),
  ipService.ping(),
  localeService.ping(),
  tokenService.ping(),
  organizationService.ping(),
]);
