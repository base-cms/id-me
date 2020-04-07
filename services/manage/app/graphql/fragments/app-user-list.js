import gql from 'graphql-tag';

export default gql`
  fragment AppUserListFragment on AppUser {
    id
    email
    domain
    name
    givenName
    familyName
    accessLevels {
      id
      name
    }
    teams {
      id
      name
    }
    countryCode
    country {
      id
      name
      flag
    }
    regionCode
    region {
      id
      name
    }
    postalCode
    organization
    organizationTitle
    verified
    lastLoggedIn
    receiveEmail
  }
`;
