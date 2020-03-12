import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';
import gql from 'graphql-tag';

const query = gql`
  query InvitesView($input: ViewInvitationQueryInput!) {
    viewInvitation(input: $input) {
      id
      organization {
        id
        name
      }
      invitedBy {
        id
        givenName
        familyName
        email
      }
      createdAt
    }
  }
`;


export default Route.extend(RouteQueryManager, {
  model({ org_id: organizationId }) {
    const input = { organizationId };
    const variables = { input };
    return this.apollo.watchQuery({ query, variables, fetchPolicy: 'cache-and-network' }, 'viewInvitation');
  },
});
