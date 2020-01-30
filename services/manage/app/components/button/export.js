import Component from '@ember/component';
import ActionMixin from '@base-cms/id-me-manage/mixins/action-mixin';
import { ObjectQueryManager } from 'ember-apollo-client';
import { inject } from '@ember/service';
import gql from 'graphql-tag';

const mutation = gql`
  mutation RequestExportAppUsers {
    exportAppUsers
  }
`;

export default Component.extend(ActionMixin, ObjectQueryManager, {
  errorNotifier: inject(),
  context: inject(),
  notifications: inject(),

  tagName: 'button',
  classNames: 'btn btn-xl btn-info btn-circle btn-create',
  classNameBindings: [
    'isActionRunning:sk-double-bounce',
    'isActionRunning:my-auto',
  ],
  icon: 'download',
  title: 'Export',

  async click() {
    try {
      this.startAction();
      const context = this.context.appQueryContext({});
      const { exportAppUsers } = await this.apollo.mutate({ mutation, context });
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
});
