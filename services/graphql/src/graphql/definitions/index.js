const gql = require('graphql-tag');

module.exports = gql`

scalar Date

type Query {
  ping: String!
}

`;
