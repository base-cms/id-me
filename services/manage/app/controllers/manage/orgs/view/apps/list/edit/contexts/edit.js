import Controller from '@ember/controller';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import OrgQueryMixin from '@identity-x/manage/mixins/org-query';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation AppUpdateContext($applicationId: String!, $contextId: String!, $payload: ApplicationContextPayloadInput!) {
    updateApplicationContext(input: { applicationId: $applicationId, contextId: $contextId, payload: $payload }) {
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
    async updateContext() {
      try {
        this.startAction();
        const {
          id,
          name,
          description,
          email
        } = this.get('model');
        const payload = { name, description, email };
        const variables = { applicationId: this.application.id, contextId: id, payload };
        await this.mutate({ mutation, variables }, 'updateApplicationContext');
        await this.transitionToRoute('manage.orgs.view.apps.list.edit.contexts.index');
      } catch (e) {
        this.errorNotifier.show(e)
      } finally {
        this.endAction();
      }
    },
  },
});
