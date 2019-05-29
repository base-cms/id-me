const gql = require('graphql-tag');

module.exports = gql`

extend type Mutation {
  registerNewUser(input: RegisterNewUserMutationInput!): UserRegistration!
  inviteUserToOrg(input: InviteUserToOrgMutationInput!): String @requiresOrgRole(roles: [Owner, Administrator])
  sendUserLoginLink(input: SendUserLoginLinkMutationInput!): String
  userLogin(input: UserLoginMutationInput!): UserAuthentication!
}

type UserAuthentication {
  user: User!
  token: UserAuthToken!
}

type User {
  id: String!
  email: String!
}

type UserAuthToken {
  id: String!
  value: String!
}

type UserRegistration {
  user: User!
  organization: Organization!
}

input InviteUserToOrgMutationInput {
  email: String!
  role: OrganizationRole = Member
}

input SendUserLoginLinkMutationInput {
  email: String!
}

input UserLoginMutationInput {
  token: String!
}

input RegisterNewUserMutationInput {
  email: String!
  givenName: String!
  familyName: String!
  orgName: String!
}

`;
