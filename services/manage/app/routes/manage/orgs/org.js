import Route from '@ember/routing/route';
import query from '@base-cms/id-me-manage/gql/queries/active-organization';
import { RouteQueryManager } from 'ember-apollo-client';

export default Route.extend(RouteQueryManager, {
  model({ org_id: id }) {
    const context = { orgId: id };
    return this.apollo.watchQuery({ query, context }, 'activeOrganization');
  },
});
