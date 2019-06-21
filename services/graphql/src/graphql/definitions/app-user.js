const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  appUsers(input: AppUsersQueryInput!): AppUserConnection! @requiresAppRole
  appUser(input: AppUserQueryInput = {}): AppUser @requiresApp # must be public
  activeAppUser: AppUser @requiresAuth(type: AppUser)
  activeAppContext: AppContext! @requiresApp # must be public
  checkContentAccess(input: CheckContentAccessQueryInput!): AppContentAccess! @requiresApp # must be public
}

extend type Mutation {
  createAppUser(input: CreateAppUserMutationInput!): AppUser! @requiresApp # must be public
  sendAppUserLoginLink(input: SendAppUserLoginLinkMutationInput!): String @requiresApp # must be public
  loginAppUser(input: LoginAppUserMutationInput!): AppUserAuthentication! @requiresApp # must be public
  logoutAppUser(input: LogoutAppUserMutationInput!): String! @requiresApp # must be public
}

enum AppUserSortField {
  id
  email
  createdAt
  updatedAt
  lastLoggedIn
}

type AppContentAccess {
  canAccess: Boolean!
  isLoggedIn: Boolean!
  hasRequiredAccessLevel: Boolean!
  requiresAccessLevel: Boolean!
  requiredAccessLevels: [AccessLevel]!
  messages: JSON
}

type AppContext {
  user: AppUser
  mergedAccessLevels: [AccessLevel]
  mergedTeams: [Team]
  hasTeams: Boolean!
  hasUser: Boolean!
}

type AppUser {
  id: String! @projection(localField: "_id")
  email: String! @projection
  domain: String! @projection
  givenName: String @projection
  familyName: String @projection
  accessLevels: [AccessLevel] @projection(localField: "accessLevelIds")
  teams: [Team]  @projection(localField: "teamIds")
  lastLoggedIn: Date @projection
  createdAt: Date @projection
  updatedAt: Date @projection
}

type AppUserConnection @projectUsing(type: "AppUser") {
  totalCount: Int!
  edges: [AppUserEdge]!
  pageInfo: PageInfo!
}

type AppUserEdge {
  node: AppUser!
  cursor: String!
}

type AppUserAuthentication {
  user: AppUser!
  token: AppUserAuthToken!
}

type AppUserAuthToken {
  id: String!
  value: String!
}

input AppUserQueryInput {
  email: String!
}

input AppUsersQueryInput {
  sort: AppUserSortInput = {}
  pagination: PaginationInput = {}
}

input AppUserSortInput {
  field: AppUserSortField = id
  order: SortOrder = desc
}

input CheckContentAccessQueryInput {
  isEnabled: Boolean!
  requiredAccessLevelIds: [String]
}

input CreateAppUserMutationInput {
  email: String!
  givenName: String
  familyName: String
}

input LoginAppUserMutationInput {
  token: String!
}

input LogoutAppUserMutationInput {
  token: String!
}

input SendAppUserLoginLinkMutationInput {
  email: String!
  authUrl: String!
  redirectTo: String
  fields: JSON
}

`;
