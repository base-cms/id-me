const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  organization(input: OrganizationQueryInput!): Organization! @requiresOrgRole
  activeOrganization: Organization! @requiresOrgRole
  organizationUsers: [OrganizationMembership] @requiresOrgRole
  organizationInvitations: [OrganizationInvitation] @requiresOrgRole
  organizationApplications: [Application] @requiresOrgRole
}

extend type Mutation {
  createOrganization(input: CreateOrganizationMutationInput!): Organization! @requiresAuth
  setOrganizationName(input: SetOrganizationNameMutationInput!): Organization! @requiresOrgRole(roles: [Owner, Administrator])
  setOrganizationDescription(input: SetOrganizationDescriptionMutationInput!): Organization! @requiresOrgRole(roles: [Owner, Administrator])
  setOrganizationPhotoURL(input: SetOrganizationPhotoURLMutationInput!): Organization! @requiresOrgRole(roles: [Owner, Administrator])
}

type Organization {
  id: String!
  name: String!
  description: String
  photoURL: String
  applications: [Application!]!
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

input OrganizationQueryInput {
  id: String!
}

input CreateOrganizationMutationInput {
  name: String!
  description: String
}

input SetOrganizationDescriptionMutationInput {
  value: String!
}

input SetOrganizationPhotoURLMutationInput {
  id: String!
  value: String!
}

input SetOrganizationNameMutationInput {
  value: String!
}

`;
