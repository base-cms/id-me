import gql from 'graphql-tag';

export default gql`
  fragment TeamListFragment on Team {
    id
    name
    description
    photoURL
    cidrs
    domains
  }
`;
