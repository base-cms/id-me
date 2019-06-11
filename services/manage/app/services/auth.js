import Service from '@ember/service';
import { ObjectQueryManager } from 'ember-apollo-client';

import logout from './logout.graphql';
import authenticate from './authenticate.graphql';

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
    return this.get('apollo').mutate({ mutation: authenticate, variables }, 'userLogin');
  },

  /**
   * Deletes the current auth session token.
   *
   * @return {Promise}
   */
  delete() {
    return this.get('apollo').mutate({ mutation: logout }, 'logoutUser');
  },
});
