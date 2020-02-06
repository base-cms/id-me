const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  localeCountries(input: LocaleCountriesQueryInput = {}): [LocaleCountry!]! @requiresApp
  localeRegionsForCountry(input: LocaleRegionsForCountryQueryInput = {}): [LocaleRegion!]! @requiresApp
}

enum LocaleRegionCategory {
  Capital
  District
  OutlyingArea
  Province
  State
  Territory
}

type LocaleCountry {
  id: String!
  name: String!
  flag: String
}

type LocaleRegion {
  id: String! # a combination of the country+region code, e.g. US-WI
  code: String! # the region code, e.g. WI
  name: String! # the region name, e.g. Wisconsin
  category: LocaleRegionCategory! # the region category, e.g. State
  country: LocaleCountry! # the country information
}

input LocaleCountriesQueryInput {
  lang: String = "en"
  prioritize: [String!]! = ["US", "CA"]
  withFlag: Boolean = true
}

input LocaleRegionsForCountryQueryInput {
  countryCode: String!
  category: LocaleRegionCategory
}

`;
