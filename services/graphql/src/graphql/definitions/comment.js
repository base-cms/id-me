const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  comments(input: CommentsQueryInput = {}): CommentConnection! @requiresAppRole
  commentsForStream(input: CommentsForStreamQueryInput!): CommentConnection! @requiresApp
}

extend type Mutation {
  createComment(input: CreateCommentMutationInput!): Comment! @requiresAuth(type: AppUser)
  deleteComment(input: DeleteCommentMutationInput!): String! @requiresAppRole(roles: [Owner, Administrator, Member])

  setCommentApproved(input: SetCommentApprovedMutationInput!): Comment! @requiresAppRole(roles: [Owner, Administrator, Member])
  setCommentFlagged(input: SetCommentFlaggedMutationInput!): Comment! @requiresAuth(type: AnyUser)
}

enum CommentSortField {
  id
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
  flagged: Boolean!
  "Whether this comment has been flagged by a user."
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
  sort: CommentSortInput = {}
  pagination: PaginationInput = {}
}

input CommentSortInput {
  field: CommentSortField = id
  order: SortOrder = desc
}

input CommentsQueryInput {
  sort: CommentSortInput = {}
  pagination: PaginationInput = {}
}

input CreateCommentMutationInput {
  "The comment body."
  body: String!
  "The user's display/posting name. Will update the user's display name if this value is set and different than the current value."
  displayName: String
  "The stream this comment should be posted to. Also allows for upserting the stream info."
  stream: CreateCommentMutationStreamInput!
}

input CreateCommentMutationStreamInput {
  "The stream external identifier."
  identifier: String!
  "The (optional) stream title."
  title: String
  "The (optional) stream description."
  description: String
  "The (optional) URL where this stream appears."
  url: String
}

input DeleteCommentMutationInput {
  "The comment ID to delete."
  id: String!
}

input SetCommentApprovedMutationInput {
  "The comment ID to approved/reject."
  id: String!
  "Whether the comment is approved or rejected."
  value: Boolean!
}

input SetCommentFlaggedMutationInput {
  "The comment ID to flag/unflag."
  id: String!
  "Whether the comment is flagged or not."
  value: Boolean!
}

`;
