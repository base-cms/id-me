import gql from 'graphql-tag';

export default gql`
  fragment AccessLevelListFragment on AccessLevel {
    id
    name
    description
  }
`;
