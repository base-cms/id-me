const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  activeOrganization: Organization! @requiresOrgRole
  organizationUsers(input: OrganizationUsersQueryInput = {}): [UserMembership] @requiresOrgRole
}

extend type Mutation {
  createOrganization(input: CreateOrganizationMutationInput!): Organization! @requiresAuth
  setOrganizationName(input: SetOrganizationNameMutationInput!): Organization! @requiresOrgRole(roles: [Owner, Administrator])
  setOrganizationDescription(input: SetOrganizationDescriptionMutationInput!): Organization! @requiresOrgRole(roles: [Owner, Administrator])
}

type Organization {
  id: String!
  name: String!
  description: String
}

input CreateOrganizationMutationInput {
  name: String!
}

input OrganizationUsersQueryInput {
  sort: Boolean # @todo Implement this input.
}

input SetOrganizationDescriptionMutationInput {
  id: String!
  value: String!
}

input SetOrganizationNameMutationInput {
  id: String!
  value: String!
}

`;
