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
}

type Organization {
  id: String! @projection(localField: "_id")
  name: String! @projection
  description: String @projection
  photoURL: String @projection
  consentPolicy: String @projection

  phoneNumber: String @projection

  streetAddress: String @projection
  city: String @projection
  region: LocaleRegion @projection(localField: "regionCode", needs: ["countryCode"])
  regionCode: String @projection
  postalCode: String @projection
  country: LocaleCountry @projection(localField: "countryCode")
  countryCode: String @projection

  applications: [Application!]! @projection(localField: "_id")
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

input OrganizationApplicationsQueryInput {
  sort: ApplicationSortInput = { field: name, order: asc }
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
