const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  accessLevels: [AccessLevel] @requiresApp
  matchAccessLevels(input: MatchAccessLevelsQueryInput!): [AccessLevel] @requiresApp
}

extend type Mutation {
  createAccessLevel(input: CreateAccessLevelMutationInput!): AccessLevel! @requiresAppRole(roles: [Owner, Administrator, Member])
}

type AccessLevel {
  id: String!
  name: String!
  description: String
}

input CreateAccessLevelMutationInput {
  name: String!
  description: String
}

input MatchAccessLevelsQueryInput {
  field: String!
  phrase: String!
  position: MatchPosition = contains
  excludeIds: [String!] = []
}

`;
