const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  appUser(input: AppUserQueryInput!): AppUser @requiresApp
  activeAppUser: AppUser @requiresAuth(type: AppUser)
  activeAppContext: AppContext! @requiresApp
}

extend type Mutation {
  createAppUser(input: CreateAppUserMutationInput!): AppUser! @requiresApp
  sendAppUserLoginLink(input: SendAppUserLoginLinkMutationInput!): String @requiresApp
  loginAppUser(input: LoginAppUserMutationInput!): AppUserAuthentication! @requiresApp
  logoutAppUser(input: LogoutAppUserMutationInput!): String! @requiresApp
}

type AppContext {
  user: AppUser
  mergedAccessLevels: [AccessLevel]
  mergedTeams: [Team]
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
  fields: JSON
}

`;
