import Component from '@ember/component';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import { ObjectQueryManager } from 'ember-apollo-client';
import gql from 'graphql-tag';
import { computed } from '@ember/object';

const mutation = gql`
  mutation UserProfileEdit($input: UpdateUserProfileMutationInput!) {
    updateUserProfile(input: $input) {
      id
      givenName
      familyName
    }
  }
`;

export default Component.extend(ActionMixin, ObjectQueryManager, {
  tagName: '',

  givenName: computed.oneWay('user.givenName'),
  familyName: computed.oneWay('user.familyName'),

  actions: {
    async update(closeModal) {
      try {
        this.startAction();
        const { givenName, familyName } = this.getProperties('givenName', 'familyName');
        const input = { givenName, familyName };
        const variables = { input };
        await this.apollo.mutate({ mutation, variables }, 'updateUserProfile');
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e)
      } finally {
        this.endAction();
      }
    },
  },
});
