const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  appUsers(input: AppUsersQueryInput!): AppUserConnection! @requiresAppRole
  appUser(input: AppUserQueryInput = {}): AppUser @requiresApp # must be public
  activeAppUser: AppUser @requiresAuth(type: AppUser)
  activeAppContext: AppContext! @requiresApp # must be public
  checkContentAccess(input: CheckContentAccessQueryInput!): AppContentAccess! @requiresApp # must be public
  matchAppUsers(input: MatchAppUsersQueryInput!): AppUserConnection! @requiresAppRole
}

extend type Mutation {
  createAppUser(input: CreateAppUserMutationInput!): AppUser! @requiresApp # must be public
  exportAppUsers: String! @requiresAppRole
  manageCreateAppUser(input: ManageCreateAppUserMutationInput!): AppUser! @requiresAppRole(roles: [Owner, Administrator, Member])
  updateAppUser(input: UpdateAppUserMutationInput!): AppUser! @requiresAppRole(roles: [Owner, Administrator, Member])
  updateOwnAppUser(input: UpdateOwnAppUserMutationInput!): AppUser! @requiresAuth(type: AppUser)
  sendAppUserLoginLink(input: SendAppUserLoginLinkMutationInput!): String @requiresApp # must be public
  loginAppUser(input: LoginAppUserMutationInput!): AppUserAuthentication! @requiresApp # must be public
  logoutAppUser(input: LogoutAppUserMutationInput!): String! @requiresApp # must be public

  setAppUserBanned(input: SetAppUserBannedMutationInput!): AppUser! @requiresAppRole(roles: [Owner, Administrator, Member])
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
  application: Application!
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
  name: String @projection(localField: "givenName", needs: ["familyName"])
  givenName: String @projection
  familyName: String @projection
  displayName: String @projection(localField: "displayName", needs: ["email"])
  region: LocaleRegion @projection(localField: "regionCode", needs: ["countryCode"])
  regionCode: String @projection
  postalCode: String @projection
  country: LocaleCountry @projection(localField: "countryCode")
  countryCode: String @projection
  organization: String @projection
  organizationTitle: String @projection
  accessLevels: [AccessLevel] @projection(localField: "accessLevelIds")
  teams: [Team]  @projection(localField: "teamIds")
  lastLoggedIn: Date @projection
  verified: Boolean @projection
  banned: Boolean @projection
  receiveEmail: Boolean @projection
  regionalConsent: AppUserRegionalConsent! @projection
  createdAt: Date @projection
  updatedAt: Date @projection
}

type AppUserRegionalConsent {
  eu: Boolean!
  ca: Boolean!
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

input MatchAppUsersQueryInput {
  sort: AppUserSortInput = {}
  pagination: PaginationInput = {}
  field: String!
  phrase: String!
  position: MatchPosition = contains
  excludeIds: [String!] = []
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
  organization: String
  organizationTitle: String
  countryCode: String
  regionCode: String
  postalCode: String
}

input LoginAppUserMutationInput {
  token: String!
}

input LogoutAppUserMutationInput {
  token: String!
}

input ManageCreateAppUserMutationInput {
  email: String!
  givenName: String
  familyName: String
  organization: String
  organizationTitle: String
  countryCode: String
  regionCode: String
  postalCode: String
  accessLevelIds: [String!] = []
  teamIds: [String!] = []
}

input SendAppUserLoginLinkMutationInput {
  email: String!
  authUrl: String!
  redirectTo: String
  "If provided, will use the matched application context when sending the login email."
  appContextId: String
  "Deprecated. While this field can still be sent, it is no longer used or handled."
  fields: JSON
}

input SetAppUserBannedMutationInput {
  "The user ID to ban/unban."
  id: String!
  "Whether the user will be banned or not."
  value: Boolean!
}

input UpdateAppUserPayloadInput {
  email: String!
  givenName: String
  familyName: String
  organization: String
  organizationTitle: String
  countryCode: String
  regionCode: String
  postalCode: String
  accessLevelIds: [String!] = []
  teamIds: [String!] = []
}

input UpdateAppUserMutationInput {
  id: String!
  payload: UpdateAppUserPayloadInput!
}

input UpdateOwnAppUserMutationInput {
  givenName: String
  familyName: String
  organization: String
  organizationTitle: String
  countryCode: String
  regionCode: String
  postalCode: String
  receiveEmail: Boolean
}

`;
