import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import OrgQueryMixin from '@identity-x/manage/mixins/org-query';
import { inject } from '@ember/service';
import gql from 'graphql-tag';
import orgRegionalConsentPolicy from '@identity-x/manage/graphql/fragments/organization-regional-consent-policy';

const mutation = gql`
  mutation UpdateOrganizationRegionalConsentPolicy($input: UpdateOrganizationRegionalConsentPolicyMutationInput!) {
    updateOrganizationRegionalConsentPolicy(input: $input) {
      id
      regionalConsentPolicies {
        ...OrganizationRegionalConsentPolicyFragment
      }
    }
  }

  ${orgRegionalConsentPolicy}
`;

const remove = gql`
  mutation RemoveOrganizationRegionalConsentPolicy($input: RemoveOrganizationRegionalConsentPolicyMutationInput!) {
    removeOrganizationRegionalConsentPolicy(input: $input) {
      id
      regionalConsentPolicies {
        ...OrganizationRegionalConsentPolicyFragment
      }
    }
  }

  ${orgRegionalConsentPolicy}
`;

export default Controller.extend(ActionMixin, OrgQueryMixin, {
  errorNotifier: inject(),

  actions: {
    async update(closeModal) {
      try {
        this.startAction();
        const {
          name,
          countries,
          message,
          enabled,
          required,
        } = this.model;
        const payload = {
          name,
          countryCodes: countries.map(country => country.id),
          message,
          enabled,
          required,
        };
        if (!payload.countryCodes.length) throw new Error('You must specify at least one country');

        const input = { policyId: this.model.id, payload };
        const variables = { input };
        await this.mutate({ mutation, variables }, 'updateOrganizationRegionalConsentPolicy');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },

    async delete(closeModal) {
      try {
        this.startAction();
        const input = { policyId: this.model.id };
        const variables = { input };
        await this.mutate({ mutation: remove, variables }, 'removeOrganizationRegionalConsentPolicy');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
