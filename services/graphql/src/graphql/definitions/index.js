const gql = require('graphql-tag');
const application = require('./application');
const organization = require('./organization');
const user = require('./user');

module.exports = gql`

scalar Date
scalar ObjectID

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

${application}
${organization}
${user}

`;
