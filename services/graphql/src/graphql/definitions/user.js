const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  activeUser: User! @requiresAuth
  userOrganizations(input: UserOrganizationsQueryInput = {}): [OrganizationMembership]! @requiresAuth
  userInvitations(input: UserInvitationQueryInput = {}): [OrganizationInvitation]! @requiresAuth
  viewInvitation(input: ViewInvitationQueryInput!): OrganizationInvitation @requiresAuth
}

extend type Mutation {
  registerNewUser(input: RegisterNewUserMutationInput!): UserRegistration!
  inviteUserToOrg(input: InviteUserToOrgMutationInput!): String @requiresOrgRole(roles: [Owner, Administrator])
  acceptOrgInvite(input: AcceptOrgInviteMutationInput!): String @requiresAuth
  rejectOrgInvite(input: RejectOrgInviteMutationInput!): String @requiresAuth
  removeUserInvite(input: RemoveUserInviteMutationInput!): String @requiresOrgRole(roles: [Owner, Administrator])
  updateUserOrgRole(input: UpdateUserOrgRoleMutationInput!): OrganizationMembership! @requiresOrgRole(roles: [Owner])
  removeUserFromOrg(input: RemoveUserFromOrgMutationInput!): String @requiresOrgRole(roles: [Owner, Administrator])
  sendUserLoginLink(input: SendUserLoginLinkMutationInput!): String
  userLogin(input: UserLoginMutationInput!): UserAuthentication!
  userLogout: String! @requiresAuth
  updateUserProfile(input: UpdateUserProfileMutationInput!): User! @requiresAuth
}

type UserAuthentication {
  user: User!
  token: UserAuthToken!
}

type User {
  id: String!
  email: String!
  givenName: String
  familyName: String
  photoURL: String
}

type UserAuthToken {
  id: String!
  value: String!
}

type UserRegistration {
  user: User!
  organization: Organization!
}

input AcceptOrgInviteMutationInput {
  organizationId: String!
}

input InviteUserToOrgMutationInput {
  email: String!
  role: OrganizationRole = Member
}

input RemoveUserFromOrgMutationInput {
  email: String!
}

input RemoveUserInviteMutationInput {
  email: String!
}

input RegisterNewUserMutationInput {
  email: String!
  givenName: String!
  familyName: String!
  orgName: String!
}

input RejectOrgInviteMutationInput {
  organizationId: String!
}

input SendUserLoginLinkMutationInput {
  email: String!
}

input UpdateUserProfileMutationInput {
  givenName: String!
  familyName: String!
  photoURL: String
}

input UpdateUserOrgRoleMutationInput {
  email: String!
  role: OrganizationRole!
}

input UserInvitationQueryInput {
  sort: Boolean # @todo Implement this input.
}

input UserLoginMutationInput {
  token: String!
}

input UserOrganizationsQueryInput {
  sort: Boolean # @todo Implement this input.
}

input ViewInvitationQueryInput {
  organizationId: String!
}

`;
