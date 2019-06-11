import Route from '@ember/routing/route';
import query from '@base-cms/id-me-manage/gql/queries/active-organization';
import { RouteQueryManager } from 'ember-apollo-client';
import { inject } from '@ember/service';

export default Route.extend(RouteQueryManager, {
  contextService: inject('context'),

  async model({ org_id: id }) {
    const context = { orgId: id };
    const { activeOrganization, organizationApplications } = await this.apollo.watchQuery({ query, context });
    this.get('contextService').set('apps', organizationApplications);
    return activeOrganization;
  },
});
