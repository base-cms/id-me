import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import { inject } from '@ember/service';
import gql from 'graphql-tag';

const query = gql`
  query Org {
    activeOrganization {
      id
      name
      description
      photoURL
    }
    organizationApplications {
      id
      name
    }
  }
`;

export default Route.extend(RouteQueryManager, {
  contextService: inject('context'),

  async model({ org_id: id }) {
    const context = { orgId: id };
    const data = await this.apollo.watchQuery({ query, context });
    this.get('contextService').set('orgAppQuery', data);
    return data.activeOrganization;
  },
});
