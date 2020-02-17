const {
  applicationService,
  exportService,
  localeService,
  membershipService,
  organizationService,
  userService,
} = require('@identity-x/service-clients');

module.exports = () => Promise.all([
  applicationService.ping(),
  exportService.ping(),
  localeService.ping(),
  membershipService.ping(),
  organizationService.ping(),
  userService.ping(),
]);
