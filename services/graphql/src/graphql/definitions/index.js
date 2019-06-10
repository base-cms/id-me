const gql = require('graphql-tag');
const accessLevel = require('./access-level');
const appUser = require('./app-user');
const application = require('./application');
const locale = require('./locale');
const organization = require('./organization');
const team = require('./team');
const user = require('./user');

module.exports = gql`

scalar Date
scalar ObjectID
scalar JSON

directive @requiresApp on FIELD_DEFINITION
directive @requiresAppRole(roles: [OrganizationRole!] = []) on FIELD_DEFINITION
directive @requiresAuth(type: AuthorizationType = OrgUser) on FIELD_DEFINITION
directive @requiresOrgRole(roles: [OrganizationRole!] = []) on FIELD_DEFINITION

enum OrganizationRole {
  Owner
  Administrator
  Member
  Guest
}

enum AuthorizationType {
  OrgUser
  AppUser
}

type Query {
  ping: String!
}

type Mutation {
  ping: String!
}

${accessLevel}
${appUser}
${application}
${locale}
${organization}
${team}
${user}

`;
