import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import gql from 'graphql-tag';

const query = gql`
  query Invitations {
    userInvitations {
      id
      organization {
        id
        name
        description
        photoURL
      }
      user {
        givenName
        familyName
      }
      role
    }
  }
`;

export default Route.extend(RouteQueryManager, {
  model() {
    return this.apollo.watchQuery({ query }, 'userInvitations');
  },
});
