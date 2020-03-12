import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import { inject } from '@ember/service';
import gql from 'graphql-tag';
import { on } from '@ember/object/evented';

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

  resetContext: on('deactivate', function() {
    this.contextService.set('orgAppQuery', {});
  }),

  async model({ org_id: id }) {
    const context = { orgId: id };
    const data = await this.apollo.watchQuery({ query, context, fetchPolicy: 'network-only' });
    this.contextService.set('orgAppQuery', data);
    return data.activeOrganization;
  },
});
