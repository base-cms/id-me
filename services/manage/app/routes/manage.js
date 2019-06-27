import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject } from '@ember/service';
import { RouteQueryManager } from 'ember-apollo-client';
import gql from 'graphql-tag';

const query = gql`
  query ActiveUser {
    activeUser {
      id
      givenName
      familyName
    }
  }
`;

export default Route.extend(AuthenticatedRouteMixin, RouteQueryManager, {
  contextService: inject('context'),

  model() {
    return this.apollo.watchQuery({ query }, 'activeUser');
  },

  afterModel(user, transition) {
    this.contextService.set('user', user);
    if (this.contextService.userProfileIncomplete) {
      const queryParams = { route: transition.to.name };
      return this.transitionTo('set-profile', { queryParams });
    }
  },
});
