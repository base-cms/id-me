import Service from '@ember/service';
import { ObjectQueryManager } from 'ember-apollo-client';

import logoutUser from '@base-cms/id-me-manage/gql/mutations/user/logout';
import userLogin from '@base-cms/id-me-manage/gql/mutations/user/login';

export default Service.extend(ObjectQueryManager, {
  /**
   * Submits authentication credentials (logs a user in).
   *
   * @param {string} email
   * @param {string} password
   * @return {Promise}
   */
  submit(token) {
    const variables = {
      input: { token },
    };
    return this.get('apollo').mutate({ mutation: userLogin, variables }, 'userLogin');
  },

  /**
   * Deletes the current auth session token.
   *
   * @return {Promise}
   */
  delete() {
    return this.get('apollo').mutate({ mutation: logoutUser }, 'logoutUser');
  },
});
