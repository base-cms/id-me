import Controller from '@ember/controller';
import { ObjectQueryManager } from 'ember-apollo-client';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import { inject } from '@ember/service';
import gql from 'graphql-tag';

const mutation = gql`
  mutation SetProfile($input: UpdateUserProfileMutationInput!) {
    updateUserProfile(input: $input) {
      id
      givenName
      familyName
    }
  }
`;

export default Controller.extend(ActionMixin, ObjectQueryManager, {
  errorNotifier: inject(),
  router: inject(),
  session: inject(),

  actions: {
    /**
     *
     */
    async submit() {
      try {
        this.startAction();
        const { givenName, familyName } = this.get('model');
        const input = { givenName, familyName };
        const variables = { input };
        await this.apollo.mutate({ mutation, variables }, 'updateUserProfile');

        if (this.session.redirectTo) {
          const { name, segments } = this.session.redirectTo;
          this.router.transitionTo(name, ...(segments || []));
          this.set('session.redirectTo', null);
        } else {
          this.router.transitionTo('manage');
        }
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
