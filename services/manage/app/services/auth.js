import Service from '@ember/service';
import { ObjectQueryManager } from 'ember-apollo-client';
import gql from 'graphql-tag';

const logout = gql`
  mutation Logout {
    userLogout
  }
`;

const authenticate = gql`
  mutation Authenticate($input: UserLoginMutationInput!) {
    userLogin(input: $input){
      token {
        id
        value
      }
      user {
        id
        email
        givenName
        familyName
      }
    }
  }
`;

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
