const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  team(input: TeamQueryInput!): Team
  teams(input: TeamsQueryInput = {}): TeamConnection! @requiresAppRole
}

extend type Mutation {
  createTeam(input: CreateTeamMutationInput!): Team! @requiresAppRole(roles: [Owner, Administrator, Member])
  updateTeam(input: UpdateTeamMutationInput!): Team! @requiresAppRole(roles: [Owner, Administrator, Member])
}

enum TeamSortField {
  id
  name
  createdAt
  updatedAt
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
  createdAt: Date
  updatedAt: Date
}

type TeamConnection {
  totalCount: Int!
  edges: [TeamEdge]!
  pageInfo: PageInfo!
}

type TeamEdge {
  node: Team!
  cursor: String!
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

input TeamsQueryInput {
  sort: TeamSortInput = {}
  pagination: PaginationInput = {}
}

input TeamSortInput {
  field: TeamSortField = id
  order: SortOrder = desc
}

input UpdateTeamPayloadInput {
  name: String!
  description: String
  cidrs: [String!] = []
  domains: [String!] = []
  accessLevelIds: [String!] = []
}

input UpdateTeamMutationInput {
  id: String!
  payload: UpdateTeamPayloadInput!
}

`;
