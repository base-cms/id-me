import Controller from '@ember/controller';
import { ObjectQueryManager } from 'ember-apollo-client';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import gql from 'graphql-tag';

const mutation = gql`
  mutation Login($input: SendUserLoginLinkMutationInput!) {
    sendUserLoginLink(input: $input)
  }
`;

export default Controller.extend(ActionMixin, ObjectQueryManager, {
  email: null,
  sent: false,

  actions: {
    /**
     *
     */
    async submit() {
      this.startAction();
      const email = this.get('email');
      const variables = { input: { email } };
      try {
        await this.get('apollo').mutate({ mutation, variables });
        this.set('sent', true);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     */
    loginAgain() {
      this.set('sent', false);
      this.set('email', null);
    },
  },
});
