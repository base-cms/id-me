const RequiresAuthDirective = require('./requires-auth');
const RequiresOrgRoleDirective = require('./requires-org-role');

module.exports = {
  requiresAuth: RequiresAuthDirective,
  requiresOrgRole: RequiresOrgRoleDirective,
};
