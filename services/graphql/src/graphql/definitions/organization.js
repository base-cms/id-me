const gql = require('graphql-tag');

module.exports = gql`

extend type Mutation {
  setOrganizationName(input: SetOrganizationNameMutationInput!): Organization! @requiresOrgRole(roles: [Owner, Administrator])
}

type Organization {
  id: String!
  name: String!
  description: String
}

input SetOrganizationNameMutationInput {
  id: String!
  value: String!
}

`;
