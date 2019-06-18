import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';
import fragment from '@base-cms/id-me-manage/graphql/fragments/team-list';

const mutation = gql`
  mutation AppTeamEdit($input: UpdateTeamMutationInput!) {
    updateTeam(input: $input) {
      ...TeamListFragment
    }
  }
  ${fragment}
`;

export default Controller.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),

  formatTerm(term) {
    return term.trim().toLowerCase();
  },


  actions: {
    async update(closeModal) {
      try {
        this.startAction();
        const {
          id,
          name,
          description,
          domains,
          cidrs,
          accessLevels,
        } = this.get('model');

        const payload = {
          name,
          description,
          domains,
          cidrs,
          accessLevelIds: accessLevels.map(level => level.id),
        };
        const input = { id, payload };
        const variables = { input };
        await this.mutate({ mutation, variables }, 'updateTeam');
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

    setAccessLevels(accessLevels) {
      this.set('model.accessLevels', accessLevels);
    },
  }
})
