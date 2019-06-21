import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import { inject } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
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
      role
    }
  }
`;

export default Route.extend(AuthenticatedRouteMixin, RouteQueryManager, {
  contextService: inject('context'),

  model() {
    return this.apollo.watchQuery({ query }, 'userInvitations');
  },
});
