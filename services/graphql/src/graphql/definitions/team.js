const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  team(input: TeamQueryInput!): Team
  teams: [Team] @requiresApp
}

extend type Mutation {
  createTeam(input: CreateTeamMutationInput!): Team! @requiresAppRole(roles: [Owner, Administrator, Member])
}

type Team {
  id: String!
  name: String!
  description: String
  # deprecated
  ipAddresses: [String]
  cidrs: [String]
  domains: [String]
  accessLevels: [AccessLevel]
  photoURL: String
}

input CreateTeamMutationInput {
  name: String!
  description: String
  cidrs: [String!] = []
  domains: [String!] = []
  accessLevelIds: [String!] = []
}

input TeamQueryInput {
  id: String!
}

`;
