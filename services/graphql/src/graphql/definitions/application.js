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

`;
