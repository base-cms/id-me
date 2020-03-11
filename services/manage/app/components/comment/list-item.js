import Component from '@ember/component';
import { inject } from '@ember/service';
import gql from 'graphql-tag';
import ActionMixin from '@identity-x/manage/mixins/action-mixin';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';

const denyComment = gql`
  mutation DenyComment($id: String!) {
    denyComment(input: { id: $id }) {
      id
      approved
    }
  }
`;

const approveComment = gql`
  mutation ApproveComment($id: String!) {
    approveComment(input: { id: $id }) {
      id
      approved
    }
  }
`;

export default Component.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),
  classNames: ['list-group-item'],

  node: null,

  actions: {
    async toggleApproval() {
      try {
        this.startAction();
        const mutation = this.node.approved ? denyComment : approveComment;
        const key = this.node.approved ? 'denyComment' : 'approveComment';
        const variables = { id: this.node.id };
        await this.mutate({ mutation, variables }, key);
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
