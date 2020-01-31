import { inject } from '@ember/service';
import ListController from '@base-cms/id-me-manage/controllers/abstract-list';
import gql from 'graphql-tag';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import AppQueryMixin from '@base-cms/id-me-manage/mixins/app-query';

const mutation = gql`
  mutation RequestExportAppUsers {
    exportAppUsers
  }
`;

export default ListController.extend(ActionMixin, AppQueryMixin, {
  errorNotifier: inject(),
  notifications: inject(),

  init() {
    this._super(...arguments);
    this.set('sortOptions', [
      { key: 'id', label: 'ID' },
      { key: 'createdAt', label: 'Created' },
      { key: 'updatedAt', label: 'Updated' },
      { key: 'email', label: 'Email Address' },
    ]);
    this.set('sortField', 'updatedAt');
    this.set('sortOrder', 'desc');

    this.set('searchFields', [
      { key: 'email', label: 'Email Address' },
      { key: 'givenName', label: 'First Name' },
      { key: 'familyName', label: 'Last Name' },
    ]);
    this.set('field', 'email');
  },

  actions: {
    async export() {
      try {
        this.startAction();
        const { exportAppUsers } = await this.mutate({ mutation });
        if (exportAppUsers === 'ok') {
          this.notifications.success('Your request has been recieved and will be sent to your email address shortly.');
        } else {
          throw new Error('An unknown error occurred.');
        }
      } catch (e) {
        this.errorNotifier.show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
