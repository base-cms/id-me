import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import gql from 'graphql-tag';

const query = gql`
  query UserProfile {
    activeUser {
      id
      givenName
      familyName
    }
  }
`;

export default Route.extend(AuthenticatedRouteMixin, RouteQueryManager, {
  model() {
    return this.apollo.watchQuery({ query }, 'activeUser');
  },
});
