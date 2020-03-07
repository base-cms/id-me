const gql = require('graphql-tag');

module.exports = gql`

type CommentStream {
  "The internal comment stream ID."
  id: String!
  "An identifier (set by the application displaying the stream) that uniquely identifies the stream."
  identifier: String!
  "The application that owns this stream."
  application: Application!
  "The stream title. Usually the title of the webpage where the stream is displayed."
  title: String
  "The stream description."
  description: String
  "The url(s) where the stream can be viewed."
  urls: [String]!
  "Whether the stream is currently archived. Archived streams will still display comments, but will prevent new comments from being submitted."
  archived: Boolean!
}

`;
