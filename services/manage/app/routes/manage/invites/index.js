import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import gql from 'graphql-tag';

const query = gql`
  query InvitesIndex {
    userInvitations {
      id
      organization {
        id
        name
      }
      invitedBy {
        id
        givenName
        familyName
        email
      }
      createdAt
    }
  }
`;

export default Route.extend(RouteQueryManager, {
  model() {
    return this.apollo.watchQuery({ query, fetchPolicy: 'cache-and-network' }, 'userInvitations');
  },
});
