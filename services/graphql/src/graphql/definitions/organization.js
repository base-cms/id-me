const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  organization(input: OrganizationQueryInput!): Organization! @requiresOrgRole
  activeOrganization: Organization! @requiresOrgRole
  organizationUsers: [OrganizationMembership] @requiresOrgRole
  organizationInvitations: [OrganizationInvitation] @requiresOrgRole
  organizationApplications(input: OrganizationApplicationsQueryInput = {}): [Application] @requiresOrgRole
}

extend type Mutation {
  createOrganization(input: CreateOrganizationMutationInput!): Organization! @requiresAuth
  updateOrganization(input: UpdateOrganizationMutationInput!): Organization! @requiresOrgRole(roles: [Owner, Administrator])
  setOrganizationName(input: SetOrganizationNameMutationInput!): Organization! @requiresOrgRole(roles: [Owner, Administrator])
  setOrganizationDescription(input: SetOrganizationDescriptionMutationInput!): Organization! @requiresOrgRole(roles: [Owner, Administrator])
  setOrganizationPhotoURL(input: SetOrganizationPhotoURLMutationInput!): Organization! @requiresOrgRole(roles: [Owner, Administrator])

  setOrganizationCompanyInfo(input: SetOrganizationCompanyInfoMutationInput!): Organization! @requiresOrgRole(roles: [Owner, Administrator])
}

type Organization {
  id: String! @projection(localField: "_id")
  name: String! @projection
  description: String @projection
  photoURL: String @projection
  consentPolicy: String @projection

  company: OrganizationCompany @projection

  applications: [Application!]! @projection(localField: "_id")
}

type OrganizationCompany {
  id: String!
  name: String
  streetAddress: String
  city: String
  regionName: String
  postalCode: String
  phoneNumber: String
}

type OrganizationMembership {
  id: String!
  user: User!
  organization: Organization!
  role: OrganizationRole!
  createdAt: Date
}

type OrganizationInvitation {
  id: String!
  user: User!
  organization: Organization!
  role: OrganizationRole!
  invitedBy: User!
  createdAt: Date
}

input OrganizationQueryInput {
  id: String!
}

input OrganizationCompanyPayloadInput {
  name: String
  streetAddress: String
  city: String
  regionName: String
  postalCode: String
  phoneNumber: String
}

input CreateOrganizationMutationInput {
  name: String!
  description: String
  company: OrganizationCompanyPayloadInput
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

input OrganizationApplicationsQueryInput {
  sort: ApplicationSortInput = { field: name, order: asc }
}

input SetOrganizationCompanyInfoMutationInput {
  id: String!
  company: OrganizationCompanyPayloadInput
}

input UpdateOrganizationPayloadInput {
  name: String!
  description: String
  consentPolicy: String
}

input UpdateOrganizationMutationInput {
  id: String!
  payload: UpdateOrganizationPayloadInput!
}

`;
