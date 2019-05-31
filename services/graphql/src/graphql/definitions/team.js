const gql = require('graphql-tag');

module.exports = gql`

extend type Mutation {
  createTeam(input: CreateTeamMutationInput!): Team! @requiresAppRole(roles: [Owner, Administrator, Member])
}

type Team {
  id: String!
  name: String!
  description: String
  ipAddresses: [String]
  domains: [String]
  accessLevels: [AccessLevel]
}

input CreateTeamMutationInput {
  name: String!
  description: String
  ipAddresses: [String!] = []
  domains: [String!] = []
  accessLevelIds: [String!] = []
}

`;
