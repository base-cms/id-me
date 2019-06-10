const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  localeCountries(input: LocaleCountriesQueryInput = {}): [LocaleCountry!]! @requiresApp
}

type LocaleCountry {
  id: String!
  name: String!
  flag: String
}

input LocaleCountriesQueryInput {
  lang: String = "en"
  prioritize: [String!]! = ["US", "CA"]
  withFlag: Boolean = true
}

`;
