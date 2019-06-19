const ProjectUsingDirective = require('./project-using');
const ProjectionDirective = require('./projection');
const RequiresAppDirective = require('./requires-app');
const RequiresAppRoleDirective = require('./requires-app-role');
const RequiresAuthDirective = require('./requires-auth');
const RequiresOrgRoleDirective = require('./requires-org-role');

module.exports = {
  projectUsing: ProjectUsingDirective,
  projection: ProjectionDirective,
  requiresApp: RequiresAppDirective,
  requiresAppRole: RequiresAppRoleDirective,
  requiresAuth: RequiresAuthDirective,
  requiresOrgRole: RequiresOrgRoleDirective,
};
