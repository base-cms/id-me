import Route from '@ember/routing/route';
import gql from 'graphql-tag';
import { RouteQueryManager } from 'ember-apollo-client';
import { inject } from '@ember/service';
import { on } from '@ember/object/evented';

const query = gql`
  query OrgApp {
    activeApplication {
      id
      name
      description
    }
  }
`;

export default Route.extend(RouteQueryManager, {
  contextService: inject('context'),

  resetContext: on('deactivate', function() {
    this.contextService.set('app', {});
  }),

  async model({ app_id: id }) {
    const context = { appId: id };
    const app = await this.apollo.watchQuery({ query, context, fetchPolicy: 'cache-and-network' }, 'activeApplication');
    this.contextService.set('app', app);
    return app;
  },
});
