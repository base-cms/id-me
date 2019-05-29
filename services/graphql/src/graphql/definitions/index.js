const gql = require('graphql-tag');
const organization = require('./organization');
const user = require('./user');

module.exports = gql`

scalar Date
scalar ObjectID

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

${organization}
${user}

`;
