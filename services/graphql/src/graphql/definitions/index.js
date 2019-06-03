const gql = require('graphql-tag');
const accessLevel = require('./access-level');
const appUser = require('./app-user');
const application = require('./application');
const organization = require('./organization');
const team = require('./team');
const user = require('./user');

module.exports = gql`

scalar Date
scalar ObjectID
scalar JSON

directive @requiresApp on FIELD_DEFINITION
directive @requiresAppRole(roles: [OrganizationRole!] = []) on FIELD_DEFINITION
directive @requiresAuth on FIELD_DEFINITION
directive @requiresOrgRole(roles: [OrganizationRole!] = []) on FIELD_DEFINITION

enum OrganizationRole {
  Owner
  Administrator
  Member
  Guest
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
${organization}
${team}
${user}

`;
