import Route from '@ember/routing/route';
import OrgQueryMixin from '@identity-x/manage/mixins/org-query';
import { inject } from '@ember/service';
import gql from 'graphql-tag';
import orgCompanyFragment from '@identity-x/manage/graphql/fragments/organization-company';
import orgRegionalConsentPolicy from '@identity-x/manage/graphql/fragments/organization-regional-consent-policy';

const query = gql`
  query OrganizationSettings($input: OrganizationQueryInput!) {
    organization(input: $input) {
      id
      name
      description
      consentPolicy
      emailConsentRequest
      company {
        ...OrganizationCompanyFragment
      }
      regionalConsentPolicies {
        ...OrganizationRegionalConsentPolicyFragment
      }
    }
  }

  ${orgCompanyFragment}
  ${orgRegionalConsentPolicy}
`;

export default Route.extend(OrgQueryMixin, {
  contextService: inject('context'),

  async model() {
    const input = { id: this.contextService.orgId };
    const org = await this.query({ query, variables: { input }, fetchPolicy: 'network-only' }, 'organization');
    if (!org.company) org.set('company', {});
    return org;
  },
});
