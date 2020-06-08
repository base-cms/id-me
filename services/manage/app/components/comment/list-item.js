import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import gql from 'graphql-tag';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';

const setCommentApproved = gql`
  mutation SetCommentApproved($id: String!, $value: Boolean!) {
    setCommentApproved(input: { id: $id, value: $value }) {
      id
      approved
    }
  }
`;

const setCommentFlagged = gql`
  mutation SetCommentFlagged($id: String!, $value: Boolean!) {
    setCommentFlagged(input: { id: $id, value: $value }) {
      id
      flagged
    }
  }
`;

const setAppUserBanned = gql`
  mutation SetAppUserBanned($id: String!, $value: Boolean!) {
    setAppUserBanned(input: { id: $id, value: $value }) {
      id
      banned
    }
  }
`;

const setCommentStreamArchived = gql`
  mutation SetCommentStreamArchived($id: String!, $value: Boolean!) {
    setCommentStreamArchived(input: { id: $id, value: $value }) {
      id
      archived
    }
  }
`;

const deleteComment = gql`
  mutation DeleteComment($id: String!) {
    deleteComment(input: { id: $id })
  }
`;

export default Component.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),
  classNames: ['list-group-item'],

  node: null,

  isTogglingApproval: false,
  isTogglingFlag: false,
  isDeleting: false,
  isTogglingUserBan: false,
  isTogglingStreamArchive: false,

  streamQueryParams: computed('node.stream.{id,identifier}', function() {
    return [{ id: this.get('node.stream.id'), identifier: this.get('node.stream.identifier') }];
  }),

  userQueryParams: computed('node.user.{id,email}', function() {
    return [{ id: this.get('node.user.id'), email: this.get('node.user.email') }];
  }),

  bodyHtml: computed('node.body', function() {
    return this.node.body.replace(/\n/g, '<br>');
  }),

  actions: {
    async toggleApproval() {
      try {
        this.set('isTogglingApproval', true);
        const variables = { id: this.node.id, value: !this.node.approved };
        await this.mutate({ mutation: setCommentApproved, variables }, 'setCommentApproved');
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        if (!this.isDestroyed) this.set('isTogglingApproval', false);
      }
    },

    async toggleFlag() {
      try {
        this.set('isTogglingFlag', true);
        const variables = { id: this.node.id, value: !this.node.flagged };
        await this.mutate({ mutation: setCommentFlagged, variables }, 'setCommentFlagged');
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        if (!this.isDestroyed) this.set('isTogglingFlag', false);
      }
    },

    async deleteComment() {
      try {
        this.set('isDeleting', true);
        const variables = { id: this.node.id };
        await this.mutate({ mutation: deleteComment, variables, refetchQueries: ['AppComments'] }, 'deleteComment');
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        if (!this.isDestroyed) this.set('isDeleting', false);
      }
    },

    async toggleUserBan() {
      try {
        this.set('isTogglingUserBan', true);
        const { user } = this.node;
        const variables = { id: user.id, value: !user.banned };
        await this.mutate({ mutation: setAppUserBanned, variables, refetchQueries: ['AppComments'] }, 'setAppUserBanned');
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        if (!this.isDestroyed) this.set('isTogglingUserBan', false);
      }
    },

    async toggleStreamArchive() {
      try {
        this.set('isTogglingStreamArchive', true);
        const { stream } = this.node;
        const variables = { id: stream.id, value: !stream.archived };
        await this.mutate({ mutation: setCommentStreamArchived, variables, refetchQueries: ['AppComments'] }, 'setCommentStreamArchived');
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        if (!this.isDestroyed) this.set('isTogglingStreamArchive', false);
      }
    },
  },
});
