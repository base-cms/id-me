import { RouteQueryManager } from 'ember-apollo-client';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import query from '@base-cms/id-me-manage/gql/queries/user/organizations';
import Route from '@ember/routing/route';

export default Route.extend(AuthenticatedRouteMixin, RouteQueryManager, {

  model() {
    return this.apollo.watchQuery({ query }, 'userOrganizations');
  }

});
