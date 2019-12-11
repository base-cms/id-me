const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  activeApplication: Application! @requiresApp
  application(input: ApplicationQueryInput!): Application! @requiresApp
}

extend type Mutation {
  createApplication(input: CreateApplicationMutationInput!): Application! @requiresOrgRole(roles: [Owner, Administrator])
  setApplicationName(input: SetApplicationNameMutationInput!): Application! @requiresAppRole(roles: [Owner, Administrator])
}

enum ApplicationSortField {
  id
  name
  createdAt
  updatedAt
}

type Application {
  id: String!
  name: String!
  email: String!
  description: String
}

input ApplicationQueryInput {
  id: String!
}

input CreateApplicationMutationInput {
  name: String!
  email: String!
  description: String
}

input SetApplicationNameMutationInput {
  value: String!
}

input ApplicationSortInput {
  field: ApplicationSortField = id
  order: SortOrder = desc
}

`;
