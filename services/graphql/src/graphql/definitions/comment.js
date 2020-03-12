const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  comment(input: CommentQueryInput!): Comment
  comments(input: CommentsQueryInput = {}): CommentConnection! @requiresAppRole
  commentsForStream(input: CommentsForStreamQueryInput!): CommentConnection! @requiresApp
}

extend type Mutation {
  createComment(input: CreateCommentMutationInput!): Comment! @requiresAuth(type: AppUser)
  deleteComment(input: DeleteCommentMutationInput!): String! @requiresAppRole(roles: [Owner, Administrator, Member])

  setCommentApproved(input: SetCommentApprovedMutationInput!): Comment! @requiresAppRole(roles: [Owner, Administrator, Member])
  setCommentBody(input: SetCommentBodyMutationInput!): Comment! @requiresAppRole(roles: [Owner, Administrator, Member])
  setCommentFlagged(input: SetCommentFlaggedMutationInput!): Comment! @requiresAuth(type: AnyUser)
}

enum CommentSortField {
  id
}

type Comment {
  "The internal comment ID."
  id: String! @projection(localField: "_id")
  "The stream that this comment belongs to."
  stream: CommentStream! @projection(localField: "streamId")
  "The application user that posted the comment."
  user: AppUser! @projection(localField: "appUserId")
  "The comment body/post."
  body: String! @projection
  "Whether the comment has been approved (or is awaiting moderation)."
  approved: Boolean! @projection
  "Whether this comment has been banned. This is automatically set based on the banned status of the posting user."
  banned: Boolean! @projection
  "Whether this comment has been deleted."
  flagged: Boolean! @projection
  "Whether this comment has been flagged by a user."
  deleted: Boolean! @projection
  "The IP address at the time of posting."
  ipAddress: String @projection
  "The date the comment was created."
  createdAt: Date! @projection
  "The date the comment was updated."
  updatedAt: Date! @projection
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

input CommentQueryInput {
  id: String!
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

input SetCommentBodyMutationInput {
  "The comment ID to update."
  id: String!
  "The new comment body."
  value: String!
}

input SetCommentFlaggedMutationInput {
  "The comment ID to flag/unflag."
  id: String!
  "Whether the comment is flagged or not."
  value: Boolean!
}

`;
