import gql from 'graphql-tag';

export default gql`
  fragment TeamListFragment on Team {
    id
    name
    active
    description
    photoURL
    cidrs
    domains
    accessLevels {
      id
      name
    }
  }
`;
