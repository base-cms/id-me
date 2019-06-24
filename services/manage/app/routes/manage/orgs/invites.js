import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import gql from 'graphql-tag';
import { get } from '@ember/object';

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

export default Route.extend(AuthenticatedRouteMixin, RouteQueryManager, {

  model() {
    return this.apollo.watchQuery({ query }, 'userInvitations');
  },

  afterModel(model) {
    this._super(...arguments);
    const { givenName, familyName } = get(model, '0.user');
    if (!givenName || !familyName) this.user.profileShown = true;
  }
});
