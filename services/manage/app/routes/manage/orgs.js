import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import { inject } from '@ember/service';
import gql from 'graphql-tag';

const query = gql`
  query Orgs {
    userOrganizations {
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

export default Route.extend(RouteQueryManager, {
  contextService: inject('context'),

  model() {
    return this.apollo.watchQuery({ query }, 'userOrganizations');
  },

  afterModel(model) {
    this.contextService.set('userOrganizations', model);
  },
});
