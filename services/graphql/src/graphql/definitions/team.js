const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  team(input: TeamQueryInput!): Team
  teams(input: TeamsQueryInput = {}): TeamConnection! @requiresAppRole
  matchTeams(input: MatchTeamsQueryInput!): TeamConnection! @requiresAppRole
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
  id: String! @projection(localField: "_id")
  name: String! @projection
  description: String @projection
  active: Boolean @projection
  # deprecated
  ipAddresses: [String] @projection(localField: "cidrs.value")
  cidrs: [String] @projection(localField: "cidrs.value")
  domains: [String] @projection
  accessLevels: [AccessLevel] @projection(localField: "accessLevelIds")
  photoURL: String @projection
  createdAt: Date @projection
  updatedAt: Date @projection
}

type TeamConnection @projectUsing(type: "Team") {
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

input MatchTeamsQueryInput {
  sort: TeamSortInput = {}
  pagination: PaginationInput = {}
  field: String!
  phrase: String!
  position: MatchPosition = contains
  excludeIds: [String!] = []
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
  active: Boolean! = true
}

input UpdateTeamMutationInput {
  id: String!
  payload: UpdateTeamPayloadInput!
}

`;
