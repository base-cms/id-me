const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  userMemberships(input: UserMembershipsQueryInput = {}): [UserMembership]! @requiresAuth
}

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

type UserMembership {
  id: String!
  organization: Organization!
  role: OrganizationRole!
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

input RegisterNewUserMutationInput {
  email: String!
  givenName: String!
  familyName: String!
  orgName: String!
}

input SendUserLoginLinkMutationInput {
  email: String!
}

input UserLoginMutationInput {
  token: String!
}

input UserMembershipsQueryInput {
  sort: Boolean # @todo Implement this input.
}

`;
