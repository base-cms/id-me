import Route from '@ember/routing/route';
import OrgQueryMixin from '@identity-x/manage/mixins/org-query';
import { inject } from '@ember/service';
import gql from 'graphql-tag';
import orgRegionalConsentPolicy from '@identity-x/manage/graphql/fragments/organization-regional-consent-policy';


const query = gql`
  query OrgRegionalConsentPolicy($input: OrganizationQueryInput!) {
    organization(input: $input) {
      id
      regionalConsentPolicies {
        ...OrganizationRegionalConsentPolicyFragment
      }
    }
  }
  ${orgRegionalConsentPolicy}
`;

export default Route.extend(OrgQueryMixin, {
  contextService: inject('context'),

  async model({ consent_id }) {
    const input = { id: this.contextService.orgId };
    const org = await this.query({ query, variables: { input }, fetchPolicy: 'network-only' }, 'organization');
    const policy = org.regionalConsentPolicies.find(policy => policy.id === consent_id);
    if (!policy) throw new Error(`No regional consent policy found for ID ${consent_id}`);
    return policy;
  },
});
