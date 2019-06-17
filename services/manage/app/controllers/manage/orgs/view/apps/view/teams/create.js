import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation AppTeamCreate($input: CreateTeamMutationInput!) {
    createTeam(input: $input) {
      id
      name
      description
    }
  }
`;

const formatMultline = (v) => {
  if (!v) return [];
  const lines = v.split(/\r?\n/);
  return lines.map(l => l.trim()).filter(l => l);
};

export default Controller.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),

  actions: {
    async create(closeModal) {
      try {
        this.startAction();
        const { name, description, domains, cidrs } = this.get('model');
        const input = {
          name,
          description,
          domains: formatMultline(domains),
          cidrs: formatMultline(cidrs),
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
  }
})
