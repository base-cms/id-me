import gql from 'graphql-tag';

export default gql`
  fragment UserProfileFragment on User {
    id
    givenName
    familyName
  }
`;
