const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  appUser(input: AppUserQueryInput!): AppUser @requiresApp
}

extend type Mutation {
  createAppUser(input: CreateAppUserMutationInput!): AppUser! @requiresApp
  sendAppUserLoginLink(input: SendAppUserLoginLinkMutationInput!): String @requiresApp
}

type AppUser {
  id: String!
  email: String!
  domain: String!
  givenName: String
  familyName: String
  accessLevels: [AccessLevel]
  teams: [Team]
}

input AppUserQueryInput {
  email: String!
}

input CreateAppUserMutationInput {
  email: String!
  givenName: String
  familyName: String
}

input SendAppUserLoginLinkMutationInput {
  email: String!
  authUrl: String!
  fields: JSON
}

`;
