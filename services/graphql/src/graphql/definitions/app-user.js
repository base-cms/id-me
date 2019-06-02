const gql = require('graphql-tag');

module.exports = gql`

extend type Mutation {
  createAppUser(input: CreateAppUserMutationInput!): AppUser! @requiresApp
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

input CreateAppUserMutationInput {
  email: String!
  givenName: String!
  familyName: String!
}

`;
