const gql = require('graphql-tag');

module.exports = gql`

type Comment {
  "The internal comment ID."
  id: String!
  "The stream that this comment belongs to."
  stream: CommentStream!
  "The application user that posted the comment."
  user: AppUser!
  "The comment body/post."
  body: String!
  "Whether the comment has been approved (or is awaiting moderation)."
  approved: Boolean!
  "Whether this comment has been banned. This is automatically set based on the banned status of the posting user."
  banned: Boolean!
  "Whether this comment has been deleted."
  deleted: Boolean!
  "The IP address at the time of posting."
  ipAddress: String
}

`;
