import Route from '@ember/routing/route';
import query from '@base-cms/id-me-manage/gql/queries/active-application';
import { RouteQueryManager } from 'ember-apollo-client';

export default Route.extend(RouteQueryManager, {

  model({ app_id: id }) {
    const context = { appId: id };
    return this.apollo.watchQuery({ query, context }, 'activeApplication');
  },

});
