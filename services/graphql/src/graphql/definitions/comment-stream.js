const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  commentStream(input: CommentStreamQueryInput!): CommentStream
  matchCommentStreams(input: MatchCommentStreamsQueryInput!): CommentStreamConnection! @requiresAppRole
}

extend type Mutation {
  setCommentStreamArchived(input: SetCommentStreamArchivedMutationInput!): CommentStream! @requiresAppRole(roles: [Owner, Administrator, Member])
}

enum CommentStreamSortField {
  id
}

type CommentStream {
  "The internal comment stream ID."
  id: String! @projection(localField: "_id")
  "An identifier (set by the application displaying the stream) that uniquely identifies the stream."
  identifier: String! @projection
  "The application that owns this stream."
  application: Application! @projection(localField: "applicationId")
  "The stream title. Usually the title of the webpage where the stream is displayed."
  title: String @projection
  "The stream description."
  description: String @projection
  "The url where the stream can be viewed."
  url: String @projection
  "Whether the stream is currently archived. Archived streams will still display comments, but will prevent new comments from being submitted."
  archived: Boolean! @projection
}

type CommentStreamConnection @projectUsing(type: "CommentStream") {
  totalCount: Int!
  edges: [CommentStreamEdge]!
  pageInfo: PageInfo!
}

type CommentStreamEdge {
  node: CommentStream!
  cursor: String!
}

input CommentStreamQueryInput {
  "The comment stream ID to retrieve."
  id: String!
}

input CommentStreamSortInput {
  field: CommentStreamSortField = id
  order: SortOrder = desc
}

input MatchCommentStreamsQueryInput {
  sort: CommentStreamSortInput = {}
  pagination: PaginationInput = {}
  "The field to search against."
  field: String!
  "The phrease to search for."
  phrase: String!
  position: MatchPosition = contains
  excludeIds: [String!] = []
}

input SetCommentStreamArchivedMutationInput {
  "The comment stream ID to archived/unarchive."
  id: String!
  "Whether to archive the stream."
  value: Boolean!
}

`;
