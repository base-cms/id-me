const RequiresAppDirective = require('./requires-app');
const RequiresAppRoleDirective = require('./requires-app-role');
const RequiresAuthDirective = require('./requires-auth');
const RequiresOrgRoleDirective = require('./requires-org-role');

module.exports = {
  requiresApp: RequiresAppDirective,
  requiresAppRole: RequiresAppRoleDirective,
  requiresAuth: RequiresAuthDirective,
  requiresOrgRole: RequiresOrgRoleDirective,
};
