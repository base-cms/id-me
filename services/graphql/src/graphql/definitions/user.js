const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  activeUser: User! @requiresAuth
  userOrganizations(input: UserOrganizationsQueryInput = {}): [UserMembership]! @requiresAuth
}

extend type Mutation {
  registerNewUser(input: RegisterNewUserMutationInput!): UserRegistration!
  inviteUserToOrg(input: InviteUserToOrgMutationInput!): String @requiresOrgRole(roles: [Owner, Administrator])
  updateUserOrgRole(input: UpdateUserOrgRoleMutationInput!): UserMembership! @requiresOrgRole(roles: [Owner])
  sendUserLoginLink(input: SendUserLoginLinkMutationInput!): String
  userLogin(input: UserLoginMutationInput!): UserAuthentication!
  userLogout: String! @requiresAuth
  setActiveUserGivenName(input: SetActiveUserGivenNameMutationInput!): User! @requiresAuth
  setActiveUserFamilyName(input: SetActiveUserFamilyNameMutationInput!): User! @requiresAuth
}

type UserAuthentication {
  user: User!
  token: UserAuthToken!
}

type UserMembership {
  id: String!
  user: User!
  organization: Organization!
  role: OrganizationRole!
}

type User {
  id: String!
  email: String!
  givenName: String
  familyName: String
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

input SetActiveUserFamilyNameMutationInput {
  value: String!
}

input SetActiveUserGivenNameMutationInput {
  value: String!
}

input UpdateUserOrgRoleMutationInput {
  email: String!
  role: OrganizationRole!
}

input UserLoginMutationInput {
  token: String!
}

input UserOrganizationsQueryInput {
  sort: Boolean # @todo Implement this input.
}

`;
