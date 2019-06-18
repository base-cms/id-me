import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation AppTeamCreate($input: CreateTeamMutationInput!) {
    createTeam(input: $input) {
      id
    }
  }
`;

export default Controller.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),

  formatTerm(term) {
    return term.trim().toLowerCase();
  },

  actions: {
    async create(closeModal) {
      try {
        this.startAction();
        const { name, description, domains, cidrs } = this.get('model');
        const input = {
          name,
          description,
          domains,
          cidrs,
        };
        const variables = { input };
        const refetchQueries = ['AppTeams'];
        await this.mutate({ mutation, variables, refetchQueries }, 'createTeam');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e)
      } finally {
        this.endAction();
      }
    },

    returnToList() {
      return this.transitionToRoute('manage.orgs.view.apps.view.teams');
    },

    addDomain(domain) {
      const formatted = this.formatTerm(domain);
      if (formatted) this.get('model.domains').pushObject(formatted);
    },

    changeDomains(domains) {
      this.set('model.domains', domains);
    },

    addCIDR(cidr) {
      const formatted = this.formatTerm(cidr);
      if (formatted) this.get('model.cidrs').pushObject(formatted);
    },

    changeCIDRs(cidrs) {
      this.set('model.cidrs', cidrs);
    },
  }
})
