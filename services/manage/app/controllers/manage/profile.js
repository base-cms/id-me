import Controller from '@ember/controller';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import { ObjectQueryManager } from 'ember-apollo-client';
import gql from 'graphql-tag';
import { inject } from '@ember/service';

const mutation = gql`
  mutation UserProfileEdit($input: UpdateUserProfileMutationInput!) {
    updateUserProfile(input: $input) {
      id
    }
  }
`;

export default Controller.extend(ActionMixin, ObjectQueryManager, {
  errorNotifier: inject(),
  user: inject(),

  actions: {
    async update(closeModal) {
      try {
        this.startAction();
        const { givenName, familyName, photoURL } = this.get('model');
        const input = { givenName, familyName, photoURL };
        const variables = { input };
        await this.apollo.mutate({ mutation, variables }, 'updateUserProfile');
        this.user.set('model.givenName', givenName);
        this.user.set('model.familyName', familyName);
        this.user.set('model.photoURL', photoURL);
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e)
      } finally {
        this.endAction();
      }
    },
  },
});
