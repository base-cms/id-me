import { RouteQueryManager } from 'ember-apollo-client';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import query from '@base-cms/id-me-manage/gql/queries/user/organizations';
import Route from '@ember/routing/route';

export default Route.extend(AuthenticatedRouteMixin, RouteQueryManager, {

  async model() {
    const orgs = await this.apollo.watchQuery({ query }, 'userOrganizations');
    return orgs.map(({ organization }) => organization);
  },

});
