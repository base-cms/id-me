const gql = require('graphql-tag');
const user = require('./user');

module.exports = gql`

scalar Date
scalar ObjectID

enum OrganizationRole {
  Owner
  Administrator
  Member
  Guest
}

type Query {
  ping: String!
}

type Mutation {
  ping: String!
}

${user}

`;
