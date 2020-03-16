import gql from 'graphql-tag';

export default gql`
  fragment CommentListFragment on Comment {
    id
    body
    approved
    banned
    flagged
    createdAt
    user {
      id
      email
      displayName
      givenName
      familyName
      banned
    }
    stream {
      id
      fullTitle
      archived
      url
    }
  }
`;
