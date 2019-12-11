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
    country {
      id
      name
      flag
    }
    organization
    organizationTitle
  }
`;
