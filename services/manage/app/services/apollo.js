import ApolloService from 'ember-apollo-client/services/apollo';
import { computed } from "@ember/object";
import { inject as service } from '@ember/service';
import { setContext } from 'apollo-link-context';
import { get } from '@ember/object';
import { Promise } from 'rsvp';

const authorize = (session) => {
  if (!get(session, 'isAuthenticated')) return { headers: {} };
  return new Promise((resolve) => {
    const token = get(session, 'data.authenticated.session.token');
    const headers = { Authorization: `Bearer ${token}` };
    resolve({ headers })
  });
};

export default ApolloService.extend({
  session: service(),

  link: computed(function() {
    const link = this._super(...arguments);
    const authLink = setContext(() => authorize(this.get('session')));
    return authLink.concat(link);
  }),
});
