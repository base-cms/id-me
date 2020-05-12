const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  localeCountries(input: LocaleCountriesQueryInput = {}): [LocaleCountry!]!
  localeRegions(input: LocaleRegionsQueryInput = {}): [LocaleRegion!]!
}

"A list of regional category designations."
enum LocaleRegionCategory {
  Capital
  District
  OutlyingArea
  Province
  State
  Territory
}

"A list of country codes that currently have regional data."
enum LocaleCountriesWithRegions {
  CA
  MX
  US
}

type LocaleCountry {
  "The ISO-3166 Alpha2 country code"
  id: String!
  "The country name"
  name: String!
  "The country's flag emoji"
  flag: String
}

type LocaleRegion {
  "A combination of the country + region code, e.g. US-WI"
  id: String!
  "The region code, e.g. WI"
  code: String!
  "The region name, e.g. Wisconsin"
  name: String!
  "The region category, e.g. State"
  category: LocaleRegionCategory!
  "The country information"
  country: LocaleCountry!
}

input LocaleCountriesQueryInput {
  "The language to return."
  lang: String = "en"
  "A list of country codes to prioritize. These countries will be listed first in the response."
  prioritize: [String!]! = ["US", "CA"]
  "Whether to include the country flag emoji."
  withFlag: Boolean = true
}

input LocaleRegionsQueryInput {
  "The Alpha2 country codes to filter by, e.g. [US, CA]. Leaving empty will return all countries."
  countryCodes: [LocaleCountriesWithRegions] = []
  "The region categories to filter by, e.g. [State, Territory, District]. Leaving empty will return all region types."
  categories: [LocaleRegionCategory] = []
}

`;
