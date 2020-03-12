import Route from '@ember/routing/route';
import OrgQueryMixin from '@identity-x/manage/mixins/org-query';
import { inject } from '@ember/service';
import gql from 'graphql-tag';

const query = gql`
  query OrganizationSettings($input: OrganizationQueryInput!) {
    organization(input: $input) {
      id
      name
      description
      consentPolicy
    }
  }
`;

export default Route.extend(OrgQueryMixin, {
  contextService: inject('context'),

  model() {
    const input = { id: this.contextService.orgId };
    return this.query({ query, variables: { input }, fetchPolicy: 'network-only' }, 'organization');
  },
});
