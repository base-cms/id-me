const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  commentStream(input: CommentStreamQueryInput!): CommentStream
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

input CommentStreamQueryInput {
  "The comment stream ID to retrieve."
  id: String!
}

`;
