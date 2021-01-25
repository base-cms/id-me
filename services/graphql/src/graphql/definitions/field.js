const gql = require('graphql-tag');

module.exports = gql`

interface FieldInterface {
  "The internal field ID."
  id: String! @projection(localField: "_id")
  "The internal name of the field."
  name: String! @projection
  "The user-facing field label. This is what will appear on a form."
  label: String!
}

type SelectField implements FieldInterface {
  "The internal field ID."
  id: String! @projection(localField: "_id")
  "The internal name of the field."
  name: String! @projection
  "The user-facing field label. This is what will appear on a form."
  label: String! @projection
  "Whether the select field supports multiple answers."
  multiple: Boolean! @projection
  "The select options."
  options: [SelectFieldOption!]! @projection
}

type SelectFieldOption {
  "The select option ID. Also used as the option value."
  id: String! @projection(localField: "_id")
  "The select option label. This is the value the user will see within the form control."
  label: String! @projection
}

`;
