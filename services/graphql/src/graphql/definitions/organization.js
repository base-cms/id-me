const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  activeOrganization: Organization! @requiresOrgRole
  organizationUsers: [OrganizationMembership] @requiresOrgRole
  organizationInvitations: [OrganizationInvitation] @requiresOrgRole
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

type OrganizationMembership {
  id: String!
  user: User!
  organization: Organization!
  role: OrganizationRole!
}

type OrganizationInvitation {
  id: String!
  user: User!
  organization: Organization!
  role: OrganizationRole!
}

input CreateOrganizationMutationInput {
  name: String!
}

input SetOrganizationDescriptionMutationInput {
  value: String!
}

input SetOrganizationNameMutationInput {
  value: String!
}

`;
