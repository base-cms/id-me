import Route from '@ember/routing/route';
import query from './org.graphql';
import { RouteQueryManager } from 'ember-apollo-client';
import { inject } from '@ember/service';

export default Route.extend(RouteQueryManager, {
  contextService: inject('context'),

  async model({ org_id: id }) {
    const context = { orgId: id };
    const data = await this.apollo.watchQuery({ query, context });
    this.get('contextService').set('orgAppQuery', data);
    return data.activeOrganization;
  },
});
