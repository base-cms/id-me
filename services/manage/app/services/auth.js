import Service from '@ember/service';
import { ObjectQueryManager } from 'ember-apollo-client';

import activeUser from '@base-cms/id-me-manage/gql/queries/user/active-user';
import logoutUser from '@base-cms/id-me-manage/gql/mutations/user/logout';
import userLogin from '@base-cms/id-me-manage/gql/mutations/user/login';

export default Service.extend(ObjectQueryManager, {
  /**
   * Checks the current session.
   *
   * @param {string} token
   * @return {Promise}
   */
  check(token) {
    const variables = {
      input: { token },
    };
    return this.get('apollo').watchQuery({ query: activeUser, variables, fetchPolicy: 'network-only' }, 'activeUser').then((auth) => {
      this.set('response', auth);
      return auth;
    });
  },

  /**
   * Submits authentication credentials (logs a user in).
   *
   * @param {string} email
   * @param {string} password
   * @return {Promise}
   */
  submit(email, password) {
    const variables = {
      input: { email, password },
    };
    return this.get('apollo').mutate({ mutation: userLogin, variables }, 'userLogin').then((auth) => {
      this.set('response', auth);
      return auth;
    })
  },

  /**
   * Deletes the current auth session token.
   *
   * @return {Promise}
   */
  delete() {
    return this.get('apollo').mutate({ mutation: logoutUser }, 'logoutUser').then(() => {
      this.set('response', null);
    });
  },
});
