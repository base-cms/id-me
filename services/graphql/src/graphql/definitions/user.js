const gql = require('graphql-tag');

module.exports = gql`

extend type Mutation {
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

`;
