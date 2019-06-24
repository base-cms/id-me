import Component from '@ember/component';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import { ObjectQueryManager } from 'ember-apollo-client';
import gql from 'graphql-tag';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

const query = gql`
  query UserProfile {
    activeUser {
      id
      givenName
      familyName
    }
  }
`;

const mutation = gql`
  mutation UserProfileEdit($input: UpdateUserProfileMutationInput!) {
    updateUserProfile(input: $input) {
      id
    }
  }
`;

export default Component.extend(ActionMixin, ObjectQueryManager, {
  user: inject(),
  tagName: '',
  title: null,
  isActionRunning: false,
  isModalCloseable: computed.reads('user.profileCloseable'),

  async init() {
    this._super(...arguments);
    this.set('model', await this.apollo.watchQuery({ query }, 'activeUser'));
  },

  actions: {
    async update(closeModal) {
      try {
        this.startAction();
        const { givenName, familyName, photoURL } = this.get('model');
        const input = { givenName, familyName, photoURL };
        const variables = { input };
        await this.apollo.mutate({ mutation, variables }, 'updateUserProfile');
        this.set('isModalOpen', false);
        await closeModal();
      } catch (e) {
        this.errorNotifier.show(e)
      } finally {
        this.endAction();
      }
    },
    async close() {
      this.set('isModalOpen', false);
    },
  },
});
