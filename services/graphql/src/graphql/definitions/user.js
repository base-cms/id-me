const gql = require('graphql-tag');

module.exports = gql`

extend type Mutation {
  inviteUserToOrg(input: InviteUserToOrgMutationInput!): String
}

input InviteUserToOrgMutationInput {
  organizationId: String!
  email: String!
  role: OrganizationRole = Member
}

`;
