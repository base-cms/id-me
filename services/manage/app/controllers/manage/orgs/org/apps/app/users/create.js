import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';
import gql from 'graphql-tag';

const mutation = gql`
  mutation AppUserCreate($input: CreateAppUserMutationInput!) {
    createAppUser(input: $input) {
      id
      givenName
      familyName
      email
    }
  }
`;

export default Controller.extend(ActionMixin, AppQueryMixin, {
  actions: {
    async create() {
      try {
        this.startAction();
        const { givenName, familyName, email } = this.get('model');
        const input = { givenName, familyName, email };
        const variables = { input };
        const refetchQueries = ['AppUsers'];
        await this.mutate({ mutation, variables, refetchQueries }, 'createAppUser');
        this.transitionToRoute('manage.orgs.org.apps.app.users');
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endAction();
      }
    },

    clear() {
      this.set('model', {});
      this.transitionToRoute('manage.orgs.org.apps.app.users');
    },
  }
})
