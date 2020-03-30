import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import OrgQueryMixin from '@identity-x/manage/mixins/org-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation AppAddContext($applicationId: String!, $payload: ApplicationContextPayloadInput!) {
    addApplicationContext(input: { applicationId: $applicationId, payload: $payload }) {
      id
      contexts {
        id
        name
        email
        description
      }
    }
  }
`;

export default Controller.extend(ActionMixin, OrgQueryMixin, {
  errorNotifier: inject(),

  actions: {
    async addContext() {
      try {
        this.startAction();
        const {
          name,
          description,
          email
        } = this.get('model');
        const payload = { name, description, email };
        const variables = { applicationId: this.application.id, payload };
        await this.mutate({ mutation, variables }, 'addApplicationContext');
        await this.transitionToRoute('manage.orgs.view.apps.list.edit.contexts.index');
      } catch (e) {
        this.errorNotifier.show(e)
      } finally {
        this.endAction();
      }
    },
  },
});
