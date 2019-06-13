import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { ObjectQueryManager } from 'ember-apollo-client';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import gql from 'graphql-tag';

const mutation = gql`
  mutation Login($input: SendUserLoginLinkMutationInput!) {
    sendUserLoginLink(input: $input)
  }
`;

export default Controller.extend(ActionMixin, ObjectQueryManager, {
  errorNotifier: inject(),

  email: null,
  sent: false,

  actions: {
    /**
     *
     */
    async submit() {
      this.startAction();
      this.set('errorMessage', null);
      const email = this.get('email');
      const variables = { input: { email } };
      try {
        await this.get('apollo').mutate({ mutation, variables });
        this.set('sent', true);
      } catch (e) {
        const err = this.errorNotifier.handle(e);
        this.set('errorMessage', err.message);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     */
    startOver() {
      this.set('sent', false);
      this.set('email', null);
    },
  },
});
