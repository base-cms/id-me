import Controller from '@ember/controller';
import { ObjectQueryManager } from 'ember-apollo-client';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import mutation from '@base-cms/id-me-manage/gql/mutations/user/send-user-login-link';

export default Controller.extend(ActionMixin, ObjectQueryManager, {
  email: null,
  sent: false,

  actions: {
    async submit() {
      this.startAction();
      const email = this.get('email');
      const variables = { input: { email } };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'sendUserLoginLink');
        this.set('sent', true);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  }
});
