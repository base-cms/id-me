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

enum MatchPosition {
  contains
  starts
  ends
  exact
}

enum SortOrder {
  asc
  desc
}

type Query {
  ping: String!
}

type Mutation {
  ping: String!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}

input PaginationInput {
  limit: Int = 20
  after: String
}

${accessLevel}
${appUser}
${application}
${locale}
${organization}
${team}
${user}

`;
