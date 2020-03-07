const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  commentsForStream(input: CommentsForStreamQueryInput!): CommentConnection! @requiresApp
}

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
  "The date the comment was created."
  createdAt: Date!
  "The date the comment was updated."
  updatedAt: Date!
}

type CommentConnection @projectUsing(type: "Comment") {
  totalCount: Int!
  edges: [CommentEdge]!
  pageInfo: PageInfo!
}

type CommentEdge {
  node: Comment!
  cursor: String!
}

input CommentsForStreamQueryInput {
  "The external stream identifier to retrieve comments for."
  identifier: String!
}

`;
