const {
  applicationService,
  mailerService,
} = require('@identity-x/service-clients');

module.exports = () => Promise.all([
  applicationService.ping(),
  mailerService.ping(),
]);
