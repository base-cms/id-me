import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import gql from 'graphql-tag';

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
  model({ app_id: id }) {
    const context = { appId: id };
    return this.apollo.watchQuery({ query, context }, 'activeApplication');
  },
});
