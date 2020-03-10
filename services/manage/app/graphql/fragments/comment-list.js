import gql from 'graphql-tag';

export default gql`
  fragment CommentListFragment on Comment {
    id
    body
    approved
    banned
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
      title
      urls
      archived
    }
  }
`;
