import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import OrgQueryMixin from '@base-cms/id-me-manage/mixins/org-query';
import gql from 'graphql-tag';

const mutation = gql`
  mutation OrgCreate($input: CreateOrganizationMutationInput!) {
    createOrganization(input: $input) {
      id
      name
      description
      photoURL
    }
  }
`;

export default Controller.extend(ActionMixin, OrgQueryMixin, {
  actions: {
    async create() {
      try {
        this.startAction();
        const { name, description } = this.get('model');
        const input = { name, description };
        const variables = { input };
        const refetchQueries = ['Orgs'];
        await this.mutate({ mutation, variables, refetchQueries }, 'createOrganization');
        await this.transitionToRoute('manage.orgs');
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endAction();
      }
    },

    async clear() {
      this.set('model', {});
      await this.transitionToRoute('manage.orgs');
    },
  }
})
