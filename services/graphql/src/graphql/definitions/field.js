const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  fields(input: FieldsQueryInput = {}): FieldInterfaceConnection!
}

extend type Mutation {
  createSelectField(input: CreateSelectFieldMutationInput!): SelectField! @requiresAppRole(roles: [Owner, Administrator, Member])
}

enum FieldInterfaceSortField {
  id
  name
  label
  createdAt
  updatedAt
}

interface FieldInterface {
  "The internal field ID."
  id: String! @projection(localField: "_id")
  "The internal name of the field."
  name: String! @projection
  "The user-facing field label. This is what will appear on a form."
  label: String!
  "The date the field was created."
  createdAt: Date! @projection
  "The date the field was updated."
  updatedAt: Date! @projection
}

type FieldInterfaceConnection {
  totalCount: Int!
  edges: [FieldInterfaceEdge]!
  pageInfo: PageInfo!
}

type FieldInterfaceEdge {
  node: FieldInterface!
  cursor: String!
}

input FieldInterfaceSortInput {
  field: FieldInterfaceSortField = id
  order: SortOrder = desc
}

type SelectField implements FieldInterface {
  "The internal field ID."
  id: String! @projection(localField: "_id")
  "The internal name of the field."
  name: String! @projection
  "The user-facing field label. This is what will appear on a form."
  label: String! @projection
  "The date the field was created."
  createdAt: Date! @projection
  "The date the field was updated."
  updatedAt: Date! @projection

  "Whether the select field supports multiple answers."
  multiple: Boolean! @projection
  "The select options."
  options: [SelectFieldOption!]! @projection
}

type SelectFieldOption {
  "The select option ID. Also used as the option value."
  id: String!
  "The select option label. This is the value the user will see within the form control."
  label: String!
}

input CreateSelectFieldMutationInput {
  "The internal name of the field."
  name: String!
  "The user-facing field label. This is what will appear on a form."
  label: String!
  "Whether the select field supports multiple answers."
  multiple: Boolean = false
  "The initial options for the select field. By default, no options are set."
  options: [CreateSelectFieldOptionInput!] = []
}

input CreateSelectFieldOptionInput {
  "The select option label. This is the value the user will see within the form control."
  label: String!
}

input FieldsQueryInput {
  sort: FieldInterfaceSortInput = {}
  pagination: PaginationInput = {}
}

`;
