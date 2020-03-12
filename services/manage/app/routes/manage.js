import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject } from '@ember/service';
import { RouteQueryManager } from 'ember-apollo-client';
import gql from 'graphql-tag';
import fragment from '@identity-x/manage/graphql/fragments/user-profile';

const query = gql`
  query ActiveUser {
    activeUser {
      ...UserProfileFragment
    }
  }
  ${fragment}
`;

export default Route.extend(AuthenticatedRouteMixin, RouteQueryManager, {
  contextService: inject('context'),

  model() {
    return this.apollo.watchQuery({ query, fetchPolicy: 'network-only' }, 'activeUser');
  },

  afterModel(user) {
    this.contextService.set('user', user);
    if (this.contextService.userProfileIncomplete) {
      return this.transitionTo('set-profile');
    }
  },
});
